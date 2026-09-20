import { VibeMatch } from '@/components/features/VibeMatch';

export function VibeMatchView({ onOpen }) {
  return (
    <div className="pt-32 pb-20">
      <div className="px-6 sm:px-10 mb-4">
        <h1 className="font-display text-4xl mb-2" style={{ fontWeight: 600 }}>
          Vibe Match
        </h1>
        <p className="text-[var(--text-dim)]">
          A three-question quiz that finds the one movie that fits how you want to feel.
        </p>
      </div>
      <VibeMatch onOpen={onOpen} />
    </div>
  );
}