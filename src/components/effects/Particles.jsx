import { useMemo } from 'react';
import { cn } from '@/utils/cn';

/**
 * Particles
 * Lightweight floating particle system. Each particle drifts upward
 * with a randomized delay/duration and fades in/out. Uses pure CSS
 * animations (`floaty`) — no JS animation loop, so it's cheap.
 *
 * @param {Object} props
 * @param {number} [props.count=20] - Number of particles
 * @param {string} [props.color='rgba(255,255,255,0.4)'] - Particle color
 * @param {string} [props.className] - Positioning classes (usually absolute inset-0)
 * @param {number} [props.minSize=2] - Minimum particle size in px
 * @param {number} [props.maxSize=5] - Maximum particle size in px
 */
export function Particles({
  count = 20,
  color = 'rgba(255,255,255,0.4)',
  className = '',
  minSize = 2,
  maxSize = 5,
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 8,
        size: minSize + Math.random() * (maxSize - minSize),
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [count, minSize, maxSize]
  );

  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: -10,
            width: p.size,
            height: p.size,
            background: color,
            opacity: p.opacity,
            animation: `floaty ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
}