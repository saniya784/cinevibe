import { useEffect, useRef, useState } from 'react';
import {
  IconFilm,
  IconMenu,
  IconMoon,
  IconX,
} from '@/components/ui/Icon';
import { SearchBar } from '@/components/ui/SearchBar';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { TonightsPick } from '@/components/features/TonightsPick';
import { useThemeContext } from '@/context/ThemeContext';
import { cn } from '@/utils/cn';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'movies', label: 'Movies' },
  { id: 'moods', label: 'Moods' },
  { id: 'vibematch', label: 'Vibe Match' },
  { id: 'favorites', label: 'Favorites' },
];

export function Navbar({
  view,
  onNavigate,
  cinemaMode,
  onToggleCinema,
  search,
  onSearch,
  onTonightsPick,
  onSelectMovie,
  onSelectMood,
  onNavigateToMovies,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useThemeContext();
  const searchInputRef = useRef(null);
  const searchWrapRef = useRef(null);

  /* Scroll-aware background */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Global keyboard: `/` focuses search, Esc closes drawer + search */
  useEffect(() => {
    const onKey = (e) => {
      const target = e.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (e.key === '/' && !isTyping) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setSearchOpen(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Click outside closes dropdown */
  useEffect(() => {
    if (!searchOpen) return;
    const onClick = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [searchOpen]);

  const handleNavigate = (id) => {
    onNavigate(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isGlass = scrolled || view !== 'home' || mobileOpen;

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-30 transition-all duration-300',
        isGlass
          ? 'bg-[var(--ink)]/90 backdrop-blur-lg border-b border-[var(--line)]'
          : 'bg-transparent',
        cinemaMode && 'opacity-35 saturate-50'
      )}
    >
      <div className="px-6 sm:px-10 h-16 flex items-center justify-between">
        {/* Brand + nav */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
            aria-label="CineVibe home"
          >
            <IconFilm size={18} className="text-[var(--violet)]" />
            <span
              className="font-display text-xl"
              style={{ fontWeight: 600, color: 'var(--text)' }}
            >
              CineVibe
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNavigate(l.id)}
                aria-current={view === l.id ? 'page' : undefined}
                className={cn(
                  'text-sm transition-colors relative py-1',
                  view === l.id
                    ? 'text-[var(--text)] font-medium'
                    : 'text-[var(--text-dim)] hover:text-[var(--text)]'
                )}
              >
                {l.label}
                {view === l.id && (
                  <span
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, var(--violet), transparent)',
                    }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          {/* Search wrapper (relative for dropdown) */}
          <div ref={searchWrapRef} className="relative hidden sm:block w-56 lg:w-72">
            <SearchBar
              ref={searchInputRef}
              value={search}
              onChange={onSearch}
              onFocusChange={(f) => setSearchOpen(f || !!search)}
              placeholder="Search movies, genres, moods…"
            />
            <SearchDropdown
              open={searchOpen}
              query={search}
              recents={[]} /* will be passed via props below if desired */
              onSelectMovie={onSelectMovie}
              onSelectMood={onSelectMood}
              onSelectQuery={onNavigateToMovies}
              onClearRecents={() => {}}
              onClose={() => setSearchOpen(false)}
            />
          </div>

          <div className="hidden lg:block">
            <TonightsPick onReveal={onTonightsPick} />
          </div>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          <button
            onClick={onToggleCinema}
            title="Cinema Mode (C)"
            aria-label="Toggle cinema mode"
            aria-pressed={cinemaMode}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center border transition-all',
              cinemaMode
                ? 'bg-[var(--violet)] border-[var(--violet)] text-white shadow-[0_0_15px_rgba(255,116,82,0.5)]'
                : 'border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[var(--text-dim)]'
            )}
          >
            <IconMoon size={15} />
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-[var(--line)]"
            style={{ color: 'var(--text)' }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <IconX size={16} /> : <IconMenu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className={cn(
            'md:hidden bg-[var(--ink)]/95 backdrop-blur-lg border-b border-[var(--line)]',
            'px-6 py-5 flex flex-col gap-4 animate-fade-slide'
          )}
        >
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNavigate(l.id)}
              className={cn(
                'text-left text-sm py-1 transition-colors',
                view === l.id
                  ? 'text-[var(--text)] font-medium'
                  : 'text-[var(--text-dim)] hover:text-[var(--text)]'
              )}
            >
              {l.label}
            </button>
          ))}

          <div className="pt-2 border-t border-[var(--line)]">
            <SearchBar
              value={search}
              onChange={onSearch}
              placeholder="Search movies…"
            />
          </div>

          <TonightsPick onReveal={onTonightsPick} />

          <div className="text-[11px] text-[var(--text-faint)] flex items-center gap-3 pt-1">
            <kbd className="px-1.5 py-0.5 rounded border border-[var(--line)] font-mono">
              /
            </kbd>
            <span>Focus search</span>
            <kbd className="px-1.5 py-0.5 rounded border border-[var(--line)] font-mono">
              C
            </kbd>
            <span>Cinema mode</span>
          </div>
        </div>
      )}
    </header>
  );
}