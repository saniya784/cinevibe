import { useEffect, useState } from 'react';

export function useSearchOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      const isMac =
        typeof navigator !== 'undefined' &&
        navigator.platform.toLowerCase().includes('mac');
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return {
    open,
    setOpen,
    close: () => setOpen(false),
    toggle: () => setOpen((o) => !o),
  };
}