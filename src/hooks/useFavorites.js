import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('cinevibe_favorites', []);

  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [setFavorites]
  );

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}