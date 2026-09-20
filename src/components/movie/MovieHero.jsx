import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  IconChevD,
  IconClock,
  IconHeart,
  IconHeartFilled,
  IconInfo,
  IconMute,
  IconPlay,
  IconPlus,
  IconStar,
  IconVolume,
} from '@/components/ui/Icon';
import { MOVIES } from '@/data/movies';
import { getMovieImage } from '@/data/images';
import { Particles } from '@/components/effects/Particles';
import { cn } from '@/utils/cn';

const FEATURED_IDS = ['inception', 'dune', 'eeaao', 'interstellar', 'parasite'];
const ROTATE_MS = 9000;

export function MovieHero({
  onOpen,
  onPlayTrailer,
  favorites,
  onToggleFavorite,
  onAddToWatchlist,
}) {
  const featured = useMemo(
    () => MOVIES.filter((m) => FEATURED_IDS.includes(m.id)),
    []
  );

  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);
  const startRef = useRef(Date.now());

  const movie = featured[idx];
  const isFav = favorites.includes(movie.id);

  /* Auto-rotate + progress */
  useEffect(() => {
    startRef.current = Date.now();
    setProgress(0);
    if (paused) return;

    let raf;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(100, (elapsed / ROTATE_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        setIdx((i) => (i + 1) % featured.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [idx, paused, featured.length]);

  /* Subtle 3D tilt on poster (smaller range for elegance) */
  const handleMove = useCallback((e) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: x * 6, y: y * 4 });
  }, []);

  const handleLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <section
      ref={stageRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative h-[92vh] min-h-[600px] w-full overflow-hidden"
      style={{ perspective: '1600px' }}
    >
      {/* ===== Crossfading background ===== */}
      {featured.map((m, i) => (
        <div
          key={m.id}
          className="absolute -inset-[6%] bg-cover bg-center transition-opacity duration-[1400ms] ease-out"
          style={{
            backgroundImage: `url(${getMovieImage(m)})`,
            opacity: i === idx ? 0.85 : 0,
            animation: i === idx ? 'hero3D 22s ease-in-out infinite alternate' : 'none',
            filter: 'brightness(0.42) saturate(1.05) contrast(1.1)',
            willChange: 'opacity, transform',
          }}
        />
      ))}

      {/* Darkening overlays (fewer layers = cleaner) */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,8,18,0.75) 0%, rgba(5,8,18,0.45) 40%, rgba(5,8,18,0.98) 100%), linear-gradient(90deg, rgba(5,8,18,0.92) 0%, rgba(5,8,18,0.5) 45%, rgba(5,8,18,0.05) 70%, rgba(5,8,18,0.4) 100%)',
        }}
      />

      {/* Particles */}
      <Particles count={18} className="z-[2]" />

      {/* ===== Content grid ===== */}
      <div
        className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end pb-16 sm:pb-20"
        style={{ zIndex: 10 }}
      >
        {/* ---------- LEFT: text content ---------- */}
        <div key={movie.id} className="animate-fade-slide max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5 text-[11px] uppercase tracking-[0.18em] text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ember)] animate-pulse-dot" />
              Now Playing
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span>{movie.year}</span>
            <span className="w-px h-3 bg-white/20" />
            <span>{movie.genres[0]}</span>
          </div>

          {/* Title */}
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.96] mb-6 drop-shadow-2xl"
            style={{
              fontWeight: 600,
              background:
                'linear-gradient(180deg, #ffffff 45%, rgba(255,255,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {movie.title}
          </h1>

          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/75 mb-5">
            <span className="flex items-center gap-1.5 text-[var(--gold)]">
              <IconStar size={13} />
              <span className="font-medium">{movie.score}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <IconClock size={13} /> {movie.runtime} min
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="text-white/60">dir. {movie.director}</span>
          </div>

          {/* Synopsis */}
          <p className="text-white/80 text-sm sm:text-[15px] leading-relaxed mb-8 max-w-xl">
            {movie.synopsis}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button
              onClick={() => onPlayTrailer(movie)}
              className="group bg-white text-[#0a0a0f] font-semibold px-7 py-3.5 rounded-full flex items-center gap-2 text-sm hover:bg-white/90 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              <IconPlay size={15} className="group-hover:scale-110 transition-transform" />
              Play Trailer
            </button>
            <button
              onClick={(e) => onOpen(movie, e)}
              className="bg-white/8 border border-white/15 backdrop-blur-xl text-white px-6 py-3.5 rounded-full flex items-center gap-2 text-sm hover:bg-white/16 transition-colors"
            >
              <IconInfo size={15} /> More Info
            </button>
            <button
              onClick={() => onToggleFavorite(movie.id)}
              className="w-11 h-11 rounded-full bg-white/8 border border-white/15 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/16 transition-colors"
              aria-label="Toggle favorite"
            >
              {isFav ? (
                <IconHeartFilled size={15} className="text-[var(--ember)]" />
              ) : (
                <IconHeart size={15} />
              )}
            </button>
            <button
              onClick={() => onAddToWatchlist?.(movie.id)}
              className="w-11 h-11 rounded-full bg-white/8 border border-white/15 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/16 transition-colors"
              aria-label="Add to watchlist"
            >
              <IconPlus size={15} />
            </button>
          </div>

          {/* Slim progress + controls */}
          <div className="flex items-center gap-4 max-w-md">
            <button
              onClick={() => setPaused((p) => !p)}
              className="shrink-0 w-8 h-8 rounded-full border border-white/20 bg-white/5 backdrop-blur flex items-center justify-center text-white hover:bg-white/15 transition-colors"
              aria-label={paused ? 'Resume rotation' : 'Pause rotation'}
            >
              {paused ? (
                <IconPlay size={11} />
              ) : (
                <span className="flex gap-[2.5px]">
                  <span className="w-[2px] h-[11px] bg-white rounded-sm" />
                  <span className="w-[2px] h-[11px] bg-white rounded-sm" />
                </span>
              )}
            </button>

            <div className="flex-1 flex items-center gap-3">
              <span className="text-[10px] tabular-nums text-white/50 w-8">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 h-[2px] bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background:
                      'linear-gradient(90deg, var(--violet), #ffffff)',
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>
              <span className="text-[10px] tabular-nums text-white/50 w-8 text-right">
                {String(featured.length).padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={() => setMuted((m) => !m)}
              className="shrink-0 w-8 h-8 rounded-full border border-white/20 bg-white/5 backdrop-blur flex items-center justify-center text-white hover:bg-white/15 transition-colors"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <IconMute size={12} /> : <IconVolume size={12} />}
            </button>
          </div>
        </div>

        {/* ---------- RIGHT: poster + thumbnails ---------- */}
        <div
          className="hidden lg:flex flex-col items-end gap-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Poster */}
          <div
            className="relative"
            style={{
              transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`,
              transition: 'transform 0.5s cubic-bezier(.2,.9,.25,1)',
              willChange: 'transform',
            }}
          >
            <div
              key={movie.id}
              className="relative w-[260px] h-[390px] rounded-2xl bg-cover bg-center"
              style={{
                backgroundImage: `url(${getMovieImage(movie)})`,
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow:
                  '0 60px 100px -30px rgba(0,0,0,0.9), 0 30px 60px -20px rgba(255,116,82,0.25), inset 0 0 80px rgba(0,0,0,0.35)',
                filter: 'brightness(0.95) saturate(1.15) contrast(1.05)',
                animation: 'fadeSlideIn .8s cubic-bezier(.16,1,.3,1) both',
              }}
            >
              {/* Sheen */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    'linear-gradient(150deg, rgba(255,255,255,0.18) 0%, transparent 30%, rgba(0,0,0,0.4) 100%)',
                }}
              />
            </div>

            {/* Ambient glow behind poster */}
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-60"
              style={{
                background: `radial-gradient(ellipse at center, ${movie.c1}88, transparent 70%)`,
                transform: 'scale(0.9)',
              }}
            />
          </div>

          {/* Thumbnail strip */}
          <div className="flex items-center gap-2">
            {featured.map((f, i) => {
              const active = i === idx;
              return (
                <button
                  key={f.id}
                  onClick={() => setIdx(i)}
                  className="relative group"
                  aria-label={`Show ${f.title}`}
                >
                  <div
                    className={cn(
                      'w-11 h-16 rounded-lg overflow-hidden relative transition-all duration-300',
                      active
                        ? 'ring-2 ring-[var(--violet)] ring-offset-2 ring-offset-[var(--ink)] scale-105'
                        : 'opacity-50 hover:opacity-100 hover:scale-105'
                    )}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${getMovieImage(f)})`,
                        filter: active ? 'brightness(1) saturate(1.1)' : 'brightness(0.7)',
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  {/* Progress bar under active thumb */}
                  {active && (
                    <div className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-white/15 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--violet)]"
                        style={{
                          width: `${progress}%`,
                          transition: 'width 0.1s linear',
                        }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() =>
          window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })
        }
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors"
        style={{ zIndex: 10 }}
        aria-label="Scroll to content"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <IconChevD size={14} className="animate-bounce" style={{ animationDuration: '1.8s' }} />
      </button>
    </section>
  );
}