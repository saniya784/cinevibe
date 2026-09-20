import { useState, useEffect } from 'react';

function safeGet(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => safeGet(key, initial));

  useEffect(() => {
    safeSet(key, value);
  }, [key, value]);

  return [value, setValue];
}