import { useRef, useState } from 'react';
import { IconHeart, IconHeartFilled, IconPlay, IconStar } from '@/components/ui/Icon';
import { getMovieImage } from '@/data/images';
import { hexToRgb } from '@/utils/colors';
import { cn } from '@/utils/cn';

export function MovieCard({
  movie,
  onOpen,
  isFavorite,
  onToggleFavorite,
  onHoverMovie,
  size = 'md',
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotY = (px - 0.5) * 22;
    const rotX = (0.5 - py) * 22;
    el.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(28px) scale(1.06)`;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.boxShadow = `0 45px 80px -20px rgba(${hexToRgb(movie.c1).join(',')},0.75), 0 0 50px -12px rgba(${hexToRgb(movie.c1).join(',')},0.4)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
    el.style.boxShadow = 'var(--card-shadow)';
    setHovered(false);
    onHoverMovie?.(null);
  };

  const handleEnter = () => {
    setHovered(true);
    onHoverMovie?.(movie);
  };

  const widthClass = size === 'lg' ? 'w-[220px] sm:w-[260px]' : 'w-[150px] sm:w-[180px]';
  const heightClass = size === 'lg' ? 'h-[320px] sm:h-[380px]' : 'h-[220px] sm:h-[260px]';

  return (
    <div className={`group relative shrink-0 ${widthClass}`} style={{ perspective: '1200px' }}>
      <div
        ref={ref}
        className={cn(
          'relative rounded-[20px] overflow-hidden cursor-pointer h-full',
          'transition-transform duration-200 will-change-transform',
          heightClass
        )}
        style={{
          background: `linear-gradient(150deg, ${movie.c1}, ${movie.c2} 70%)`,
          boxShadow: 'var(--card-shadow)',
        }}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={(e) => onOpen(movie, e)}
      >
        {/* Sheen */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.3), transparent 60%)',
            opacity: hovered ? 1 : 0,
            transform: 'translateZ(5px)',
            zIndex: 2,
          }}
        />

        {/* Poster */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url(${getMovieImage(movie)})`,
            transform: hovered ? 'scale(1.18) translateZ(45px)' : 'scale(1)',
            filter: hovered ? 'brightness(1.1) contrast(1.05)' : 'none',
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={{
            background: hovered
              ? 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)'
              : 'linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,0.6) 100%)',
            zIndex: 1,
          }}
        />

        {/* Static info */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-200',
            hovered ? 'opacity-0' : 'opacity-100'
          )}
          style={{ zIndex: 4 }}
        >
          <div className="text-[10px] tracking-wide text-white/80 mb-1 drop-shadow-lg">
            {movie.year} · {movie.genres[0]}
          </div>
          <div
            className="font-display text-white text-lg leading-tight drop-shadow-lg"
            style={{ fontWeight: 600 }}
          >
            {movie.title}
          </div>
        </div>

        {/* Hover preview */}
        {hovered && (
          <div className="absolute inset-0" style={{ zIndex: 5 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(140deg, ${movie.c1}, ${movie.c2})`,
                  animation: `previewFlicker 3.6s ease-in-out infinite`,
                  animationDelay: `${i * 0.9}s`,
                }}
              />
            ))}
            <div
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                background:
                  'repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0px, transparent 1px, transparent 3px)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/50" />

            <div className="absolute top-2 left-2 flex items-center gap-1 text-[10px] text-white/90 border border-white/14 bg-white/5 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-dot" />
              Preview
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(movie.id);
              }}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 transition-all hover:scale-110"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? (
                <IconHeartFilled size={15} className="text-[var(--ember)]" />
              ) : (
                <IconHeart size={15} />
              )}
            </button>

            <div className="absolute inset-0 flex flex-col justify-end p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <IconPlay size={13} />
                </div>
                <span className="text-[12px] text-[var(--gold)] font-bold flex items-center gap-0.5 drop-shadow">
                  <IconStar size={11} /> {movie.score}
                </span>
              </div>
              <div
                className="font-display text-white text-base leading-tight mb-1.5 drop-shadow-lg"
                style={{ fontWeight: 600 }}
              >
                {movie.title}
              </div>
              <div className="flex flex-wrap gap-1">
                {movie.genres.slice(0, 2).map((g) => (
                  <span
                    key={g}
                    className="text-[9px] px-2 py-0.5 rounded-full border border-white/14 bg-white/5 text-white/90 backdrop-blur-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}