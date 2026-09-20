import { useEffect } from 'react';

export function useKeyboardShortcut(key, callback, deps = []) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key && !e.target.matches('input, textarea')) {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}