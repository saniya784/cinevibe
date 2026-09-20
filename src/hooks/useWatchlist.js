import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useLocalStorage('cinevibe_watchlist', []);

  const add = useCallback(
    (id) => {
      setWatchlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
    },
    [setWatchlist]
  );

  const remove = useCallback(
    (id) => {
      setWatchlist((prev) => prev.filter((x) => x !== id));
    },
    [setWatchlist]
  );

  const toggle = useCallback(
    (id) => {
      setWatchlist((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [setWatchlist]
  );

  const clear = useCallback(() => setWatchlist([]), [setWatchlist]);

  const has = useCallback((id) => watchlist.includes(id), [watchlist]);

  return { watchlist, add, remove, toggle, clear, has };
}