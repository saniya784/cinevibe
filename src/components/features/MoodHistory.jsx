import { MOODS } from '@/data/moods';
import { cn } from '@/utils/cn';

export function MoodHistory({ history, onSelect, onClear }) {
  if (!history.length) return null;
  const items = history
    .map((id) => MOODS.find((m) => m.id === id))
    .filter(Boolean)
    .slice(-8);

  return (
    <section className="px-6 sm:px-10 mb-10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
            Recently explored
          </span>
          <div className="h-px w-12 bg-[var(--line)]" />
        </div>
        <button
          onClick={onClear}
          className="text-[11px] text-[var(--text-faint)] hover:text-[var(--ember)] transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((m, i) => (
          <button
            key={`${m.id}-${i}`}
            onClick={() => onSelect(m.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all',
              'border-[var(--line)] text-[var(--text-dim)]',
              'hover:border-[var(--violet)] hover:text-[var(--text)]',
              'hover:-translate-y-0.5 hover:shadow-lg'
            )}
            style={{
              animation: `fadeSlideIn .4s ease ${i * 0.04}s both`,
            }}
          >
            <span>{m.emoji}</span>
            {m.label}
          </button>
        ))}
      </div>
    </section>
  );
}