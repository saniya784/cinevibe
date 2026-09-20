import { useState } from 'react';
import {
  IconX,
  IconPlus,
  IconTrash,
  IconChevR,
  IconFilm,
} from '@/components/ui/Icon';
import { MOVIES } from '@/data/movies';
import { getMovieImage } from '@/data/images';
import { cn } from '@/utils/cn';

export function Watchlist({ open, onClose, watchlist, onRemove, onOpenMovie, onClear }) {
  const items = MOVIES.filter((m) => watchlist.includes(m.id));

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full z-50 w-[88vw] max-w-md',
          'glass border-l border-[var(--glass-border)]',
          'flex flex-col transition-transform duration-500 ease-[cubic-bezier(.2,.9,.25,1)]'
        )}
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: open ? '-30px 0 80px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {/* Header */}
        <div className="p-5 border-b border-[var(--glass-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconFilm size={18} className="text-[var(--violet)]" />
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                Watchlist
              </div>
              <div className="text-[11px] text-[var(--text-faint)]">
                {items.length} {items.length === 1 ? 'title' : 'titles'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClear}
                className="text-[11px] text-[var(--text-dim)] hover:text-[var(--ember)] transition-colors px-2 py-1"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-white/10 transition-colors"
              aria-label="Close watchlist"
            >
              <IconX size={16} />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-8 text-[var(--text-faint)]">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(135deg, var(--violet), #4a2fd9)' }}
              >
                <IconPlus size={22} className="text-white" />
              </div>
              <div className="text-sm mb-1" style={{ color: 'var(--text)' }}>
                Your watchlist is empty
              </div>
              <div className="text-xs">
                Tap the + on any movie to queue it up for later.
              </div>
            </div>
          ) : (
            items.map((m, i) => (
              <div
                key={m.id}
                className="group relative rounded-xl overflow-hidden border border-[var(--glass-border)] flex items-stretch hover:border-[var(--violet)]/60 transition-colors"
                style={{
                  animation: `fadeSlideIn .4s cubic-bezier(.16,1,.3,1) ${i * 0.05}s both`,
                }}
              >
                <button
                  onClick={(e) => onOpenMovie(m, e)}
                  className="flex items-center gap-3 flex-1 text-left p-2"
                >
                  <div
                    className="w-14 h-20 rounded-lg shrink-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(150deg, ${m.c1}55, ${m.c2}99), url(${getMovieImage(m)})`,
                    }}
                  />
                  <div className="min-w-0">
                    <div
                      className="text-sm font-medium truncate"
                      style={{ color: 'var(--text)' }}
                    >
                      {m.title}
                    </div>
                    <div className="text-[11px] text-[var(--text-faint)] mb-1">
                      {m.year} · {m.genres[0]} · ★ {m.score}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {m.moods.slice(0, 2).map((mid) => (
                        <span
                          key={mid}
                          className="text-[9px] px-1.5 py-0.5 rounded-full border border-[var(--line)] text-[var(--text-dim)] capitalize"
                        >
                          {mid}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
                <div className="flex flex-col justify-center gap-1 pr-2">
                  <button
                    onClick={(e) => onOpenMovie(m, e)}
                    className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--violet)] hover:bg-white/10 transition-colors"
                    aria-label="Open details"
                  >
                    <IconChevR size={13} />
                  </button>
                  <button
                    onClick={() => onRemove(m.id)}
                    className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--ember)] hover:bg-white/10 transition-colors"
                    aria-label="Remove from watchlist"
                  >
                    <IconTrash size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}