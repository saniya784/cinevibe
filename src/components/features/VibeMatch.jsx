import { useState } from 'react';
import { IconShuffle, IconSparkle } from '@/components/ui/Icon';
import { RangeSlider } from '@/components/ui/RangeSlider';
import { MOVIES } from '@/data/movies';
import { getMovieImage } from '@/data/images';

export function VibeMatch({ onOpen }) {
  const [energy, setEnergy] = useState(6);
  const [emotion, setEmotion] = useState(6);
  const [complexity, setComplexity] = useState(6);
  const [result, setResult] = useState(null);
  const [computing, setComputing] = useState(false);

  const compute = () => {
    setComputing(true);
    setResult(null);
    setTimeout(() => {
      let best = null;
      let bestDist = Infinity;
      MOVIES.forEach((m) => {
        const d = Math.sqrt(
          (m.energy - energy) ** 2 +
            (m.emotion - emotion) ** 2 +
            (m.complexity - complexity) ** 2
        );
        if (d < bestDist) {
          bestDist = d;
          best = m;
        }
      });
      setResult(best);
      setComputing(false);
    }, 900);
  };

  return (
    <section className="px-6 sm:px-10 mb-16">
      <div className="glass rounded-3xl p-6 sm:p-10 grid md:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center gap-2 text-[var(--violet)] text-xs font-semibold mb-3 tracking-wide">
            <IconSparkle size={14} /> VIBE MATCH
          </div>
          <h3 className="font-display text-3xl mb-2" style={{ fontWeight: 600 }}>
            Three sliders. One perfect match.
          </h3>
          <p className="text-sm text-[var(--text-dim)] mb-6">
            Tell CineVibe how you want to feel — we'll do the math.
          </p>
          <RangeSlider
            label="1. Energy you want"
            value={energy}
            onChange={setEnergy}
            lo="Calm"
            hi="Adrenaline"
          />
          <RangeSlider
            label="2. Emotional depth"
            value={emotion}
            onChange={setEmotion}
            lo="Light"
            hi="Gut-punch"
          />
          <RangeSlider
            label="3. Mental complexity"
            value={complexity}
            onChange={setComplexity}
            lo="Easy watch"
            hi="Mind-bending"
          />
          <button
            onClick={compute}
            className="bg-[var(--text)] text-[var(--ink)] font-semibold px-6 py-3 rounded-full text-sm flex items-center gap-2 hover:bg-white transition-colors"
          >
            <IconShuffle size={16} /> Find my match
          </button>
        </div>

        <div className="flex items-center justify-center">
          {!result && !computing && (
            <div className="text-center text-[var(--text-faint)] text-sm max-w-[220px]">
              Your match will appear here once you set your vibe.
            </div>
          )}
          {computing && (
            <div className="shimmer-text font-display text-xl">Reading your vibe…</div>
          )}
          {result && !computing && (
            <div
              className="animate-fade-slide w-full max-w-sm rounded-2xl overflow-hidden border border-[var(--glass-border)] cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={(e) => onOpen(result, e)}
              style={{
                background: `linear-gradient(150deg, ${result.c1}bb, ${result.c2}ee), url(${getMovieImage(result)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div className="p-6 bg-gradient-to-t from-black/80 to-black/20">
                <div className="text-[11px] text-white/80 mb-2">
                  Your match — {result.score >= 9 ? 'a near-perfect fit' : 'a strong fit'}
                </div>
                <div
                  className="font-display text-white text-2xl mb-2"
                  style={{ fontWeight: 600 }}
                >
                  {result.title}
                </div>
                <div className="text-xs text-white/80 mb-3">
                  {result.year} · {result.genres.join(', ')}
                </div>
                <p className="text-sm text-white/90 leading-relaxed">{result.synopsis}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}