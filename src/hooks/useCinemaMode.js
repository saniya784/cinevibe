import { useState, useCallback, useEffect } from 'react';

export function useCinemaMode() {
  const [cinemaMode, setCinemaMode] = useState(false);

  const toggle = useCallback(() => setCinemaMode((c) => !c), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'c' && !e.target.matches('input, textarea')) {
        setCinemaMode((c) => !c);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return { cinemaMode, toggle };
}