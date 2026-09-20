import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconSparkle, IconX } from '@/components/ui/Icon';
import { cn } from '@/utils/cn';

/**
 * Toast
 * Lightweight toast notification system. Renders a stack of toasts
 * at the bottom-center of the screen. Each auto-dismisses after `duration`.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Expose globally so any component can push
    window.__cinevibeToast = (message, options = {}) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, message, ...options }]);
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, options.duration ?? 2600);
    };
    return () => {
      delete window.__cinevibeToast;
    };
  }, []);

  const dismiss = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <>
      {children}
      {createPortal(
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2 pointer-events-none">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={cn(
                'pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full',
                'glass text-sm shadow-2xl',
                'animate-fade-slide'
              )}
              style={{ color: 'var(--text)' }}
            >
              <IconSparkle size={14} className="text-[var(--violet)] shrink-0" />
              <span>{t.message}</span>
              <button
                onClick={() => dismiss(t.id)}
                className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors"
                aria-label="Dismiss"
              >
                <IconX size={12} />
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}

export function toast(message, options) {
  if (typeof window !== 'undefined' && window.__cinevibeToast) {
    window.__cinevibeToast(message, options);
  }
}