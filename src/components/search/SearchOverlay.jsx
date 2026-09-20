import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconSearch, IconX } from '@/components/ui/Icon';
import { SearchDropdown } from './SearchDropdown';
import { cn } from '@/utils/cn';

export function SearchOverlay({
  open,
  onClose,
  query,
  onQueryChange,
  recents,
  onClearRecents,
  onSelectMovie,
  onSelectMood,
  onSelectQuery,
}) {
  const inputRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-[70] flex items-start justify-center pt-[12vh] px-4',
        'transition-opacity duration-200',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: 'rgba(5,8,18,0.75)', backdropFilter: 'blur(14px)' }}
      />

      {/* Panel */}
      <div
        className={cn(
          'relative w-full max-w-2xl rounded-2xl overflow-hidden glass',
          'transition-transform duration-200',
          open ? 'scale-100 translate-y-0' : 'scale-95 -translate-y-2'
        )}
        style={{
          boxShadow:
            '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--line)]">
          <IconSearch size={18} className="text-[var(--violet)] shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search movies, genres, moods…"
            className="bg-transparent outline-none text-base w-full placeholder:text-[var(--text-faint)]"
            style={{ color: 'var(--text)' }}
            aria-label="Search"
          />
          <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded border border-[var(--line)] text-[10px] font-mono text-[var(--text-faint)]">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="sm:hidden w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-dim)]"
            aria-label="Close"
          >
            <IconX size={14} />
          </button>
        </div>

        {/* Results */}
        <div className="relative">
          <SearchDropdown
            open
            query={query}
            recents={recents}
            onSelectMovie={onSelectMovie}
            onSelectMood={onSelectMood}
            onSelectQuery={onSelectQuery}
            onClearRecents={onClearRecents}
            onClose={onClose}
            inline
          />
        </div>
      </div>
    </div>,
    document.body
  );
}