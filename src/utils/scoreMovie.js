const MOOD_WORDS = {
  mindbending: ['mind-bending', 'mind bending', 'confusing', 'twist', 'brain', 'trippy', 'complex'],
  adrenaline: ['adrenaline', 'action', 'fast', 'intense', 'pumped', 'exciting', 'thrill'],
  romantic: ['romance', 'romantic', 'love', 'date night'],
  dark: ['dark', 'grim', 'villain', 'scary'],
  whimsical: ['whimsical', 'fun', 'light', 'quirky', 'cute'],
  emotional: ['cry', 'emotional', 'sad', 'tears', 'heartfelt', 'moving'],
  uplifting: ['uplifting', 'happy', 'feel good', 'hope', 'warm'],
  suspenseful: ['suspense', 'tense', 'edge of my seat', 'mystery'],
  nostalgic: ['nostalgic', 'cozy', 'childhood', 'throwback'],
  atmospheric: ['atmospheric', 'moody', 'slow burn', 'visual'],
};

export function scoreMovieForQuery(movie, query) {
  const q = query.toLowerCase();
  let score = 0;
  const haystack = [movie.title, movie.director, movie.synopsis, ...movie.genres, ...movie.cast]
    .join(' ')
    .toLowerCase();

  Object.entries(MOOD_WORDS).forEach(([mood, words]) => {
    if (words.some((w) => q.includes(w)) && movie.moods.includes(mood)) score += 5;
  });

  movie.genres.forEach((g) => {
    if (q.includes(g.toLowerCase())) score += 3;
  });

  q.split(/\s+/).forEach((word) => {
    if (word.length > 3 && haystack.includes(word)) score += 1;
  });

  if (q.includes('adrenaline') || q.includes('hungry')) score += movie.energy / 3;
  if (q.includes('cry') || q.includes('emotional')) score += movie.emotion / 3;
  if (q.includes('mind') || q.includes('complex')) score += movie.complexity / 3;

  return score;
}