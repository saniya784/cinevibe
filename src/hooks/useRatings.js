import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useRatings() {
  const [ratings, setRatings] = useLocalStorage('cinevibe_ratings', {});

  const setRating = useCallback(
    (id, value) => {
      setRatings((prev) => {
        const next = { ...prev };
        if (value === 0) delete next[id];
        else next[id] = value;
        return next;
      });
    },
    [setRatings]
  );

  const getRating = useCallback((id) => ratings[id] ?? 0, [ratings]);

  return { ratings, setRating, getRating };
}