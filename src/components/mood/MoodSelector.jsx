import { MOODS } from '@/data/moods';
import { MoodTile } from './MoodTile';

export function MoodSelector({ activeMood, onSelect, onHoverMood }) {
  return (
    <section className="px-6 sm:px-10 mb-14">
      <div className="mb-5">
        <h2 className="font-display text-2xl sm:text-3xl" style={{ fontWeight: 600 }}>
          What's your vibe tonight?
        </h2>
        <p className="text-sm text-[var(--text-dim)] mt-1">
          Pick a feeling. CineVibe reshapes the whole screen around it.
        </p>
      </div>
      <div
        className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3"
        style={{ perspective: '1200px' }}
      >
        {MOODS.map((mood, index) => (
          <MoodTile
            key={mood.id}
            mood={mood}
            index={index}
            active={activeMood === mood.id}
            onClick={() => onSelect(activeMood === mood.id ? null : mood.id)}
            onHover={onHoverMood}
          />
        ))}
      </div>
    </section>
  );
}