import { useEffect, useRef } from 'react';

/**
 * Atmosphere
 * Renders the ambient background gradient that responds to the current
 * atmosphere color (`--atmo-a`) set by hover, selection, or AI chat.
 *
 * The CSS variable `--atmo-a` is updated by `useAtmosphere`, and this
 * component layers multiple radial gradients + a base linear gradient
 * for a deep, cinematic feel.
 */
export function Atmosphere({ children, className = '' }) {
  const ref = useRef(null);

  // Smooth transition when the CSS var changes (browsers don't animate vars)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Nudge the browser to repaint with a tiny opacity dip
    el.style.opacity = '0.98';
    const raf = requestAnimationFrame(() => {
      el.style.opacity = '1';
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className={`atmosphere min-h-screen relative transition-opacity duration-500 ${className}`}
    >
      {/* Slow-drifting grain overlay for cinematic texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-overlay z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #fff 0.5px, transparent 0.5px), radial-gradient(circle at 60% 70%, #fff 0.5px, transparent 0.5px)',
          backgroundSize: '3px 3px, 5px 5px',
        }}
      />
      {children}
    </div>
  );
}