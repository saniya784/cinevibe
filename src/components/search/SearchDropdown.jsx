import { useEffect, useMemo, useState } from 'react';
import {
  IconClock,
  IconFilm,
  IconSearch,
  IconSparkle,
  IconStar,
} from '@/components/ui/Icon';
import { MOVIES } from '@/data/movies';
import { MOODS } from '@/data/moods';
import { getMovieImage } from '@/data/images';
import { cn } from '@/utils/cn';

const TRENDING = ['Dune', 'Inception', 'Mind-Bending', 'Sci-Fi', 'Emotional', 'Nolan'];

function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark
        className="bg-[var(--violet)]/25 rounded-sm px-0.5"
        style={{ color: 'var(--text)' }}
      >
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function SearchDropdown({
  open,
  query,
  recents = [],
  onSelectMovie,
  onSelectMood,
  onSelectQuery,
  onClearRecents,
  onClose,
  inline = false,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const flat = [];

    if (!q) {
      recents.forEach((r) => flat.push({ type: 'recent', value: r }));
      return flat;
    }

    const movieMatches = MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.genres.some((g) => g.toLowerCase().includes(q)) ||
        m.cast.some((c) => c.toLowerCase().includes(q))
    ).slice(0, 5);

    const genreMatches = Array.from(new Set(MOVIES.flatMap((m) => m.genres)))
      .filter((g) => g.toLowerCase().includes(q))
      .slice(0, 3);

    const moodMatches = MOODS.filter(
      (m) => m.label.toLowerCase().includes(q) || m.id.includes(q)
    ).slice(0, 3);

    movieMatches.forEach((m) => flat.push({ type: 'movie', value: m }));
    genreMatches.forEach((g) => flat.push({ type: 'genre', value: g }));
    moodMatches.forEach((m) => flat.push({ type: 'mood', value: m }));

    return flat;
  }, [query, recents]);

  useEffect(() => setActiveIndex(0), [query, open]);

  const handlePick = (item) => {
    if (item.type === 'movie') onSelectMovie?.(item.value);
    else if (item.type === 'genre') onSelectQuery?.(item.value);
    else if (item.type === 'mood') onSelectMood?.(item.value);
    else if (item.type === 'recent') onSelectQuery?.(item.value);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        const item = results[activeIndex];
        if (item) {
          e.preventDefault();
          handlePick(item);
        } else if (query.trim()) {
          onSelectQuery?.(query.trim());
        }
      } else if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, results, activeIndex, query]);

  if (!open) return null;

  const wrapperClass = inline
    ? 'w-full'
    : 'absolute left-0 right-0 top-[calc(100%+10px)] z-50 glass rounded-2xl overflow-hidden animate-fade-slide';

  return (
    <div
      className={wrapperClass}
      style={
        inline
          ? { maxHeight: 'min(520px, 60vh)' }
          : {
              boxShadow:
                '0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
              maxHeight: 'min(560px, 75vh)',
            }
      }
      role="listbox"
    >
      {/* ===== Empty state (no query) ===== */}
      {!query.trim() && (
        <div className="p-3">
          {recents.length > 0 && (
            <>
              <div className="flex items-center justify-between px-3 pt-1 pb-2">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
                  Recent searches
                </span>
                <button
                  onClick={onClearRecents}
                  className="text-[10px] text-[var(--text-faint)] hover:text-[var(--ember)] transition-colors"
                >
                  Clear
                </button>
              </div>
              <ul className="mb-2">
                {recents.map((r) => (
                  <li key={r}>
                    <button
                      onClick={() => onSelectQuery?.(r)}
                      className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 text-sm text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-white/5 transition-colors"
                    >
                      <IconClock
                        size={14}
                        className="text-[var(--text-faint)] shrink-0"
                      />
                      <span className="truncate">{r}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="px-3 pt-2 pb-2">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
              Trending
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 px-3 pb-3">
            {TRENDING.map((t) => (
              <button
                key={t}
                onClick={() => onSelectQuery?.(t)}
                className="text-[11px] px-2.5 py-1 rounded-full border border-[var(--line)] text-[var(--text-dim)] hover:border-[var(--violet)] hover:text-[var(--violet)] transition-all"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===== No results ===== */}
      {query.trim() && results.length === 0 && (
        <div className="p-8 text-center">
          <IconSearch size={22} className="mx-auto mb-3 text-[var(--text-faint)]" />
          <div className="text-sm text-[var(--text-dim)] mb-1">
            No matches for &ldquo;{query}&rdquo;
          </div>
          <div className="text-xs text-[var(--text-faint)]">
            Try a mood, genre, or director name.
          </div>
        </div>
      )}

      {/* ===== Results ===== */}
      {query.trim() && results.length > 0 && (
        <div
          className="overflow-y-auto"
          style={{ maxHeight: inline ? 'min(480px, 55vh)' : 'min(520px, 70vh)' }}
        >
          {results.map((item, i) => {
            const active = i === activeIndex;

            if (item.type === 'movie') {
              const m = item.value;
              return (
                <button
                  key={`m-${m.id}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => handlePick(item)}
                  role="option"
                  aria-selected={active}
                  className={cn(
                    'w-full text-left flex items-center gap-3 px-3 py-2.5 transition-colors',
                    active ? 'bg-white/8' : 'hover:bg-white/5'
                  )}
                >
                  <div
                    className="w-9 h-[52px] rounded-md shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${getMovieImage(m)})` }}
                  />
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-sm font-medium truncate"
                      style={{ color: 'var(--text)' }}
                    >
                      <Highlight text={m.title} query={query} />
                    </div>
                    <div className="text-[11px] text-[var(--text-faint)] truncate">
                      {m.year} · {m.director}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[var(--gold)] shrink-0">
                    <IconStar size={11} /> {m.score}
                  </div>
                </button>
              );
            }

            if (item.type === 'genre') {
              return (
                <button
                  key={`g-${item.value}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => handlePick(item)}
                  role="option"
                  aria-selected={active}
                  className={cn(
                    'w-full text-left flex items-center gap-3 px-3 py-2.5 transition-colors',
                    active ? 'bg-white/8' : 'hover:bg-white/5'
                  )}
                >
                  <div className="w-9 h-9 rounded-md bg-white/5 border border-[var(--line)] flex items-center justify-center shrink-0">
                    <IconFilm size={14} className="text-[var(--text-dim)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm" style={{ color: 'var(--text)' }}>
                      <Highlight text={item.value} query={query} />
                    </div>
                    <div className="text-[11px] text-[var(--text-faint)]">Genre</div>
                  </div>
                </button>
              );
            }

            if (item.type === 'mood') {
              const mo = item.value;
              return (
                <button
                  key={`mo-${mo.id}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => handlePick(item)}
                  role="option"
                  aria-selected={active}
                  className={cn(
                    'w-full text-left flex items-center gap-3 px-3 py-2.5 transition-colors',
                    active ? 'bg-white/8' : 'hover:bg-white/5'
                  )}
                >
                  <div
                    className="w-9 h-9 rounded-md flex items-center justify-center text-lg shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${mo.c1}44, ${mo.c2})`,
                    }}
                  >
                    {mo.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm" style={{ color: 'var(--text)' }}>
                      <Highlight text={mo.label} query={query} />
                    </div>
                    <div className="text-[11px] text-[var(--text-faint)]">Mood</div>
                  </div>
                </button>
              );
            }

            if (item.type === 'recent') {
              return (
                <button
                  key={`r-${item.value}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => handlePick(item)}
                  role="option"
                  aria-selected={active}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm transition-colors',
                    active
                      ? 'bg-white/8 text-[var(--text)]'
                      : 'text-[var(--text-dim)] hover:bg-white/5 hover:text-[var(--text)]'
                  )}
                >
                  <IconClock size={14} className="text-[var(--text-faint)] shrink-0" />
                  <span className="truncate">{item.value}</span>
                </button>
              );
            }

            return null;
          })}

          <button
            onClick={() => onSelectQuery?.(query.trim())}
            className="w-full text-left px-3 py-3 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--text-dim)] hover:text-[var(--violet)] transition-colors"
          >
            <span className="flex items-center gap-2">
              <IconSparkle size={12} />
              See all results for &ldquo;{query}&rdquo;
            </span>
            <span className="flex items-center gap-1 text-[10px] text-[var(--text-faint)]">
              <kbd className="px-1 py-0.5 rounded border border-[var(--line)] font-mono">
                ↵
              </kbd>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}