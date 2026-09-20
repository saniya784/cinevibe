import { useState } from 'react';
import { MovieRail } from '@/components/movie/MovieRail';
import { MoodTile } from '@/components/mood/MoodTile';
import { MOVIES } from '@/data/movies';
import { MOODS } from '@/data/moods';

export function MoodsView({
  onOpen,
  favorites,
  onToggleFavorite,
  onHoverMovie,
  onHoverMood,
}) {
  const [activeMood, setActiveMood] = useState(MOODS[0].id);
  const mood = MOODS.find((m) => m.id === activeMood);
  const list = MOVIES.filter((m) => m.moods.includes(activeMood));

  return (
    <div className="pt-32 pb-20">
      <div className="px-6 sm:px-10 mb-8">
        <h1 className="font-display text-4xl mb-2" style={{ fontWeight: 600 }}>
          Explore by Mood
        </h1>
        <p className="text-[var(--text-dim)]">
          Every mood shifts CineVibe's colors to match the feeling.
        </p>
      </div>
      <div
        className="px-6 sm:px-10 grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10"
        style={{ perspective: '1200px' }}
      >
        {MOODS.map((m, i) => (
          <MoodTile
            key={m.id}
            mood={m}
            index={i}
            active={activeMood === m.id}
            onClick={() => setActiveMood(m.id)}
            onHover={onHoverMood}
          />
        ))}
      </div>
      <MovieRail
        title={`${mood.emoji} ${mood.label}`}
        movies={list}
        onOpen={onOpen}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onHoverMovie={onHoverMovie}
      />
    </div>
  );
}