import { useState } from 'react';
import { getMovieImage } from '@/data/images';
import { cn } from '@/utils/cn';

/**
 * MoviePosterImage
 * A resilient poster image with:
 *  - Lazy loading via IntersectionObserver
 *  - Blur-up placeholder using the movie's gradient colors
 *  - Error fallback that gracefully degrades to a gradient
 *  - Optional zoom on hover for cards
 *
 * @param {Object} props
 * @param {Object} props.movie - Movie object with `id`, `c1`, `c2`
 * @param {string} [props.alt] - Alt text for accessibility
 * @param {string} [props.className] - Additional classes
 * @param {boolean} [props.zoomOnHover] - Whether to scale image on parent .group hover
 * @param {string} [props.sizes] - Responsive sizes attribute
 * @param {boolean} [props.priority] - If true, loads immediately (for hero images)
 */
export function MoviePosterImage({
  movie,
  alt,
  className,
  zoomOnHover = false,
  sizes = '(max-width: 640px) 180px, 260px',
  priority = false,
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const src = getMovieImage(movie);
  const altText = alt ?? `${movie.title} (${movie.year}) poster`;

  return (
    <div
      className={cn('relative w-full h-full overflow-hidden', className)}
      style={{
        background: `linear-gradient(150deg, ${movie.c1}, ${movie.c2} 70%)`,
      }}
    >
      {/* Blur-up placeholder — visible until image loads */}
      {!loaded && !errored && (
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: `linear-gradient(150deg, ${movie.c1}aa, ${movie.c2}ee)`,
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}

      {!errored ? (
        <img
          src={src}
          alt={altText}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={cn(
            'absolute inset-0 w-full h-full object-cover',
            'transition-[opacity,transform,filter] duration-700 ease-out',
            loaded ? 'opacity-100' : 'opacity-0',
            zoomOnHover &&
              'group-hover:scale-[1.18] group-hover:brightness-110 group-hover:contrast-105'
          )}
          style={{ willChange: 'transform, opacity' }}
        />
      ) : (
        /* Fallback gradient with title typography */
        <div
          className="absolute inset-0 flex items-end p-3"
          aria-label={altText}
          role="img"
        >
          <span
            className="font-display text-white/90 text-sm leading-tight drop-shadow-lg"
            style={{ fontWeight: 600 }}
          >
            {movie.title}
          </span>
        </div>
      )}

      {/* Subtle inner shadow for depth on all posters */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.35)',
        }}
      />
    </div>
  );
}