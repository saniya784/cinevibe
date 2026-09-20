import { useCallback, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

const MAX_RECENTS = 6;

export function useSearch({ onSelectMovie, onSelectMood, onNavigateToMovies }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [recents, setRecents] = useLocalStorage('cinevibe_recents', []);

  const remember = useCallback(
    (term) => {
      const trimmed = term.trim();
      if (!trimmed) return;
      setRecents((prev) => {
        const next = [trimmed, ...prev.filter((r) => r !== trimmed)];
        return next.slice(0, MAX_RECENTS);
      });
    },
    [setRecents]
  );

  const clearRecents = useCallback(() => setRecents([]), [setRecents]);

  const selectMovie = useCallback(
    (movie) => {
      remember(movie.title);
      setOpen(false);
      setQuery('');
      onSelectMovie?.(movie);
    },
    [remember, onSelectMovie]
  );

  const selectMood = useCallback(
    (mood) => {
      // Accept either an object ({ id, label }) or a raw id string
      const id = typeof mood === 'string' ? mood : mood?.id;
      const label = typeof mood === 'object' ? mood?.label : id;
      if (label) remember(label);
      setOpen(false);
      setQuery('');
      onSelectMood?.(id);
    },
    [remember, onSelectMood]
  );

  const selectQuery = useCallback(
    (term) => {
      remember(term);
      setQuery(term);
      setOpen(false);
      onNavigateToMovies?.(term);
    },
    [remember, onNavigateToMovies]
  );

  const openDropdown = useCallback(() => setOpen(true), []);
  const closeDropdown = useCallback(() => setOpen(false), []);

  return {
    query,
    setQuery,
    open,
    setOpen,
    openDropdown,
    closeDropdown,
    recents,
    clearRecents,
    selectMovie,
    selectMood,
    selectQuery,
  };
}