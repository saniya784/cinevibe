export const MOODS = [
  { id: 'mindbending', label: 'Mind-Bending', emoji: '🧠', c1: '#6d5bd0', c2: '#12101f' },
  { id: 'adrenaline', label: 'Adrenaline', emoji: '⚡', c1: '#ff7a52', c2: '#1a0d08' },
  { id: 'romantic', label: 'Romantic', emoji: '💕', c1: '#f2545b', c2: '#2a1230' },
  { id: 'dark', label: 'Dark', emoji: '🌑', c1: '#3a3a46', c2: '#08080a' },
  { id: 'whimsical', label: 'Whimsical', emoji: '✨', c1: '#c9184a', c2: '#3a1442' },
  { id: 'emotional', label: 'Emotional', emoji: '🌧️', c1: '#3d5a80', c2: '#0b1622' },
  { id: 'uplifting', label: 'Uplifting', emoji: '🌅', c1: '#e8b64c', c2: '#2a1d0f' },
  { id: 'suspenseful', label: 'Suspenseful', emoji: '🔎', c1: '#4a5d23', c2: '#0d100d' },
  { id: 'nostalgic', label: 'Nostalgic', emoji: '🎞️', c1: '#c9974a', c2: '#241a0f' },
  { id: 'atmospheric', label: 'Atmospheric', emoji: '🌫️', c1: '#2e8b8b', c2: '#0a1e22' },
];

export const getMoodById = (id) => MOODS.find((m) => m.id === id);