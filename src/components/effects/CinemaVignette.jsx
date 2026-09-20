import { cn } from '@/utils/cn';

/**
 * CinemaVignette
 * Renders a fixed radial vignette that creates the "theater" effect.
 * Only visible when cinema mode is enabled.
 *
 * @param {Object} props
 * @param {boolean} props.active - Whether the vignette should render
 * @param {number} [props.intensity=0.85] - Peak darkness of edges (0–1)
 */
export function CinemaVignette({ active, intensity = 0.85 }) {
  if (!active) return null;

  return (
    <>
      {/* Vignette */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 pointer-events-none z-40',
          'animate-[backdropIn_.5s_ease_both]'
        )}
        style={{
          background: `radial-gradient(ellipse 75% 70% at 50% 45%, transparent 55%, rgba(0,0,0,${intensity}) 100%)`,
        }}
      />

      {/* Optional top/bottom cinema bars — subtle */}
      <div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 h-8 pointer-events-none z-40"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.6), transparent)',
        }}
      />
      <div
        aria-hidden="true"
        className="fixed bottom-0 inset-x-0 h-8 pointer-events-none z-40"
        style={{
          background:
            'linear-gradient(0deg, rgba(0,0,0,0.6), transparent)',
        }}
      />
    </>
  );
}