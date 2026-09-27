import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ShortlistContextValue {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const ShortlistContext = createContext<ShortlistContextValue>({
  ids: [],
  toggle: () => {},
  has: () => false,
  clear: () => {},
});

export function ShortlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useLocalStorage<string[]>('zamin.shortlist', []);

  const toggle = (id: string) =>
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const has = (id: string) => ids.includes(id);
  const clear = () => setIds([]);

  return (
    <ShortlistContext.Provider value={{ ids, toggle, has, clear }}>{children}</ShortlistContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useShortlist = () => useContext(ShortlistContext);
