import { useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { IconClock, IconHeart, IconHeartFilled, IconPlay, IconStar, IconX } from '@/components/ui/Icon';
import { getMovieImage } from '@/data/images';
import { MOVIES } from '@/data/movies';
import { MOODS } from '@/data/moods';

export function MovieDetailsModal({
  movie,
  origin,
  onClose,
  onPlayTrailer,
  favorites,
  onToggleFavorite,
}) {
  const isFav = movie ? favorites.includes(movie.id) : false;
  const similar = useMemo(
    () =>
      movie
        ? MOVIES.filter(
            (m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g))
          ).slice(0, 4)
        : [],
    [movie]
  );

  if (!movie) return null;

  return (
    <Modal open onClose={onClose} className="max-w-3xl w-full">
      <div
        className="glass rounded-3xl overflow-hidden"
        style={{
          '--ox': origin ? `${origin.x}%` : '50%',
          '--oy': origin ? `${origin.y}%` : '50%',
          boxShadow: '0 30px 70px rgba(0,0,0,0.6)',
          animation: 'modalGrow .45s cubic-bezier(.2,.9,.25,1) both',
          transformOrigin: `${origin?.x ?? 50}% ${origin?.y ?? 50}%`,
        }}
      >
        <div
          className="relative h-56 sm:h-72 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(150deg, ${movie.c1}99, ${movie.c2}dd), url(${getMovieImage(movie)})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            aria-label="Close"
          >
            <IconX size={16} />
          </button>
          <div className="absolute bottom-5 left-6 right-6">
            <div className="flex items-center gap-3 text-xs text-white/90 mb-2">
              <span className="flex items-center gap-1 text-[var(--gold)]">
                <IconStar size={12} /> {movie.score}
              </span>
              <span>{movie.year}</span>
              <span className="flex items-center gap-1">
                <IconClock size={12} /> {movie.runtime} min
              </span>
            </div>
            <h2
              className="font-display text-white text-3xl sm:text-4xl drop-shadow-2xl"
              style={{ fontWeight: 600 }}
            >
              {movie.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 mb-5">
            {movie.genres.map((g) => (
              <span
                key={g}
                className="text-xs px-2.5 py-1 rounded-full border border-white/14 bg-white/5"
                style={{ color: 'var(--text-dim)' }}
              >
                {g}
              </span>
            ))}
            {movie.moods.map((mid) => {
              const mo = MOODS.find((x) => x.id === mid);
              return mo ? (
                <span
                  key={mid}
                  className="text-xs px-2.5 py-1 rounded-full border border-white/14 bg-white/5"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {mo.emoji} {mo.label}
                </span>
              ) : null;
            })}
          </div>

          <p className="text-[var(--text-dim)] leading-relaxed mb-6">{movie.synopsis}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-7 text-sm">
            <div>
              <span className="text-[var(--text-faint)] text-xs">Director</span>
              <div style={{ color: 'var(--text)' }}>{movie.director}</div>
            </div>
            <div>
              <span className="text-[var(--text-faint)] text-xs">Cast</span>
              <div style={{ color: 'var(--text)' }}>{movie.cast.join(', ')}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => onPlayTrailer(movie)}
              className="bg-[var(--text)] text-[var(--ink)] font-semibold px-6 py-3 rounded-full flex items-center gap-2 text-sm hover:bg-white transition-colors"
            >
              <IconPlay size={16} /> Play Trailer
            </button>
            <button
              onClick={() => onToggleFavorite(movie.id)}
              className="bg-white/8 border border-white/12 px-6 py-3 rounded-full flex items-center gap-2 text-sm hover:bg-white/16 transition-colors"
            >
              {isFav ? (
                <IconHeartFilled size={16} className="text-[var(--ember)]" />
              ) : (
                <IconHeart size={16} />
              )}
              {isFav ? 'Saved' : 'Save'}
            </button>
          </div>

          {similar.length > 0 && (
            <div>
              <div className="text-sm mb-3" style={{ color: 'var(--text-dim)' }}>
                More like this
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {similar.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-xl overflow-hidden h-28 relative cursor-pointer hover:scale-105 transition-transform bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(150deg, ${s.c1}66, ${s.c2}bb), url(${getMovieImage(s)})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                      <span className="text-white text-xs font-medium drop-shadow">
                        {s.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}