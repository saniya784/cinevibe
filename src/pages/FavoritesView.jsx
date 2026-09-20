import { MovieCard } from '@/components/movie/MovieCard';
import { IconHeart } from '@/components/ui/Icon';
import { MOVIES } from '@/data/movies';

export function FavoritesView({ onOpen, favorites, onToggleFavorite, onHoverMovie }) {
  const list = MOVIES.filter((m) => favorites.includes(m.id));

  return (
    <div className="pt-32 px-6 sm:px-10 pb-20 min-h-[60vh]">
      <h1 className="font-display text-4xl mb-2" style={{ fontWeight: 600 }}>
        Your Favorites
      </h1>
      <p className="text-[var(--text-dim)] mb-8">
        {list.length} saved title{list.length !== 1 ? 's' : ''}
      </p>
      {list.length === 0 ? (
        <div className="text-center py-24 text-[var(--text-faint)]">
          <IconHeart size={28} className="mx-auto mb-3" />
          Nothing saved yet. Tap the heart on any title to keep it here.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {list.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onOpen={onOpen}
              isFavorite
              onToggleFavorite={onToggleFavorite}
              onHoverMovie={onHoverMovie}
              size="lg"
            />
          ))}
        </div>
      )}
    </div>
  );
}