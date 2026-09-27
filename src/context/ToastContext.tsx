import { createContext, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, Info } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  kind: 'success' | 'info';
}

const ToastContext = createContext<{ toast: (message: string, kind?: Toast['kind']) => void }>({
  toast: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, kind: Toast['kind'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { id, message, kind }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-24 left-1/2 z-[90] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4 md:bottom-8">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="fade-in pointer-events-auto flex items-center gap-2.5 rounded-full bg-primary-900 px-5 py-3 text-sm font-semibold text-white shadow-2xl"
          >
            {t.kind === 'success' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-400" />
            ) : (
              <Info className="h-4 w-4 shrink-0 text-accent-300" />
            )}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);
