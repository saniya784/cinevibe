import { useRef } from 'react';
import { MovieCard } from './MovieCard';
import { IconChevL, IconChevR } from '@/components/ui/Icon';

export function MovieRail({
  title,
  subtitle,
  movies,
  onOpen,
  favorites,
  onToggleFavorite,
  onHoverMovie,
}) {
  const scroller = useRef(null);

  const scrollBy = (dx) => {
    scroller.current?.scrollBy({ left: dx, behavior: 'smooth' });
  };

  if (!movies.length) return null;

  return (
    <section className="relative mb-12 px-6 sm:px-10">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl" style={{ fontWeight: 600 }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-[var(--text-dim)] mt-1">{subtitle}</p>
          )}
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scrollBy(-500)}
            className="w-9 h-9 rounded-full bg-black/70 backdrop-blur flex items-center justify-center hover:bg-black/90 transition-colors"
            aria-label="Scroll left"
          >
            <IconChevL size={16} />
          </button>
          <button
            onClick={() => scrollBy(500)}
            className="w-9 h-9 rounded-full bg-black/70 backdrop-blur flex items-center justify-center hover:bg-black/90 transition-colors"
            aria-label="Scroll right"
          >
            <IconChevR size={16} />
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        className="flex gap-4 overflow-x-auto pb-6 -mx-1 px-1"
        style={{
          scrollSnapType: 'x proximity',
          paddingTop: '12px',
          paddingBottom: '24px',
        }}
      >
        {movies.map((m) => (
          <div key={m.id} className="snap-start">
            <MovieCard
              movie={m}
              onOpen={onOpen}
              isFavorite={favorites.includes(m.id)}
              onToggleFavorite={onToggleFavorite}
              onHoverMovie={onHoverMovie}
            />
          </div>
        ))}
      </div>
    </section>
  );
}