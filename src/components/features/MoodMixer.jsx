import { useState } from 'react';
import { IconSparkle, IconShuffle } from '@/components/ui/Icon';
import { MOODS } from '@/data/moods';
import { MOVIES } from '@/data/movies';
import { getMovieImage } from '@/data/images';
import { cn } from '@/utils/cn';

export function MoodMixer({ onOpen }) {
  const [a, setA] = useState('mindbending');
  const [b, setB] = useState('emotional');
  const [blend, setBlend] = useState(50);
  const [result, setResult] = useState(null);
  const [mixing, setMixing] = useState(false);

  const mix = () => {
    setMixing(true);
    setResult(null);
    setTimeout(() => {
      const moodA = MOODS.find((m) => m.id === a);
      const moodB = MOODS.find((m) => m.id === b);
      const scored = MOVIES.map((m) => {
        const hasA = m.moods.includes(a) ? 1 : 0;
        const hasB = m.moods.includes(b) ? 1 : 0;
        const bonus = (hasA + hasB) * 3;
        const aWeight = (100 - blend) / 100;
        const bWeight = blend / 100;
        const palettes =
          Math.abs(m.energy - (moodA.energy ?? 6)) * aWeight +
          Math.abs(m.emotion - (moodB.emotion ?? 6)) * bWeight;
        return { m, score: bonus - palettes / 4 };
      });
      scored.sort((x, y) => y.score - x.score);
      setResult(scored[0].m);
      setMixing(false);
    }, 800);
  };

  const moodA = MOODS.find((m) => m.id === a);
  const moodB = MOODS.find((m) => m.id === b);

  return (
    <section className="px-6 sm:px-10 mb-16">
      <div className="glass rounded-3xl p-6 sm:p-10">
        <div className="flex items-center gap-2 text-[var(--violet)] text-xs font-semibold mb-3 tracking-wide">
          <IconSparkle size={14} /> MOOD MIXER
        </div>
        <h3 className="font-display text-3xl mb-2" style={{ fontWeight: 600 }}>
          Blend two moods into one perfect film.
        </h3>
        <p className="text-sm text-[var(--text-dim)] mb-8">
          Pick a primary mood and a secondary mood, then slide to decide which
          should dominate.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Mood A */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-faint)] mb-2">
              Primary mood
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {MOODS.slice(0, 10).map((m) => (
                <button
                  key={`a-${m.id}`}
                  onClick={() => setA(m.id)}
                  className={cn(
                    'rounded-xl p-2 text-center border transition-all text-xs',
                    a === m.id
                      ? 'border-[var(--violet)] bg-[var(--violet)]/10 scale-105'
                      : 'border-[var(--line)] hover:border-[var(--text-dim)]'
                  )}
                  style={{ color: 'var(--text)' }}
                >
                  <div className="text-lg mb-0.5">{m.emoji}</div>
                  <div className="truncate">{m.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mood B */}
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-faint)] mb-2">
              Secondary mood
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {MOODS.slice(0, 10).map((m) => (
                <button
                  key={`b-${m.id}`}
                  onClick={() => setB(m.id)}
                  className={cn(
                    'rounded-xl p-2 text-center border transition-all text-xs',
                    b === m.id
                      ? 'border-[var(--violet)] bg-[var(--violet)]/10 scale-105'
                      : 'border-[var(--line)] hover:border-[var(--text-dim)]'
                  )}
                  style={{ color: 'var(--text)' }}
                >
                  <div className="text-lg mb-0.5">{m.emoji}</div>
                  <div className="truncate">{m.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blend slider */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-[var(--text-dim)] mb-2">
            <span className="flex items-center gap-1.5">
              {moodA.emoji} {moodA.label}
            </span>
            <span className="text-[var(--text-faint)]">{100 - blend}% / {blend}%</span>
            <span className="flex items-center gap-1.5">
              {moodB.label} {moodB.emoji}
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={blend}
              onChange={(e) => setBlend(Number(e.target.value))}
              className="w-full"
            />
            {/* Gradient track */}
            <div
              className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 -z-10 rounded-full pointer-events-none"
              style={{
                background: `linear-gradient(90deg, ${moodA.c1}, ${moodB.c1})`,
              }}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button
            onClick={mix}
            disabled={mixing}
            className="bg-[var(--text)] text-[var(--ink)] font-semibold px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-white transition-colors disabled:opacity-50"
          >
            <IconShuffle size={16} className={mixing ? 'animate-spin' : ''} />
            {mixing ? 'Mixing…' : 'Mix moods'}
          </button>

          {result && !mixing && (
            <div
              className="flex-1 flex items-center gap-4 p-3 rounded-2xl border border-[var(--glass-border)] cursor-pointer hover:border-[var(--violet)] transition-colors animate-fade-slide"
              onClick={(e) => onOpen(result, e)}
              style={{
                background: `linear-gradient(120deg, ${moodA.c1}22, ${moodB.c1}22, transparent)`,
              }}
            >
              <div
                className="w-14 h-20 rounded-lg shrink-0 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(150deg, ${result.c1}55, ${result.c2}99), url(${getMovieImage(result)})`,
                }}
              />
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-faint)] mb-0.5">
                  Your blend
                </div>
                <div className="font-display text-lg" style={{ fontWeight: 600 }}>
                  {result.title}
                </div>
                <div className="text-[11px] text-[var(--text-faint)]">
                  {result.year} · {result.genres[0]} · ★ {result.score}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}