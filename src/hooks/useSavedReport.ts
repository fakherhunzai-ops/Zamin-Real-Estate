import { readStorage, writeStorage } from './useLocalStorage';

/**
 * "Save this report" — persists a visitor's last calculator inputs on their own
 * device (localStorage) so they can reopen the same numbers later.
 *
 * Usage:
 *   const { loadSaved, save } = useSavedReport<MyInputs>('zamin.report.mortgage');
 *   const [inputs, setInputs] = useState(() => loadSaved() ?? DEFAULTS);
 */
export function useSavedReport<T extends object>(key: string) {
  const loadSaved = (): T | null => readStorage<T | null>(key, null);
  const save = (data: T): boolean => {
    writeStorage(key, data);
    return true;
  };
  return { loadSaved, save };
}
