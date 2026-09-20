import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useMoodHistory() {
  const [history, setHistory] = useLocalStorage('cinevibe_mood_history', []);

  const push = useCallback(
    (moodId) => {
      setHistory((prev) => {
        const next = [moodId, ...prev.filter((x) => x !== moodId)];
        return next.slice(0, 12);
      });
    },
    [setHistory]
  );

  const clear = useCallback(() => setHistory([]), [setHistory]);

  return { history, push, clear };
}