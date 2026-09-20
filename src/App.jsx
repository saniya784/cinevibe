import { useCallback, useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SplashScreen } from '@/components/layout/SplashScreen';
import { AIChat } from '@/components/features/AIChat';
import { Watchlist } from '@/components/features/Watchlist';
import { MovieDetailsModal } from '@/components/movie/MovieDetailsModal';
import { TrailerModal } from '@/components/movie/TrailerModal';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { HomeView } from '@/pages/HomeView';
import { MoviesView } from '@/pages/MoviesView';
import { MoodsView } from '@/pages/MoodsView';
import { VibeMatchView } from '@/pages/VibeMatchView';
import { FavoritesView } from '@/pages/FavoritesView';
import { ThemeProvider } from '@/context/ThemeContext';
import { AtmosphereProvider, useAtmosphereContext } from '@/context/AtmosphereContext';
import { FavoritesProvider, useFavoritesContext } from '@/context/FavoritesContext';
import { ToastProvider, toast } from '@/components/ui/Toast';
import { CinemaVignette } from '@/components/effects/CinemaVignette';
import { IconBookmark } from '@/components/ui/Icon';
import { useCinemaMode } from '@/hooks/useCinemaMode';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useMoodHistory } from '@/hooks/useMoodHistory';
import { useRatings } from '@/hooks/useRatings';
import { useSearch } from '@/hooks/useSearch';
import { useSearchOverlay } from '@/hooks/useSearchOverlay';
import { cn } from '@/utils/cn';

function AppShell() {
  /* ---------- View & UI state ---------- */
  const [view, setView] = useState('home');
  const [search, setSearch] = useState('');
  const [activeMood, setActiveMood] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOrigin, setModalOrigin] = useState(null);
  const [trailerMovie, setTrailerMovie] = useState(null);
  const [splash, setSplash] = useState(true);
  const [watchlistOpen, setWatchlistOpen] = useState(false);

  /* ---------- Contexts & hooks ---------- */
  const { favorites, toggleFavorite } = useFavoritesContext();
  const [, setAtmosphere] = useAtmosphereContext();
  const { cinemaMode, toggle: toggleCinema } = useCinemaMode();
  const {
    watchlist,
    toggle: toggleWatchlist,
    remove: removeWatchlist,
    clear: clearWatchlist,
    has: hasInWatchlist,
  } = useWatchlist();
  const {
    history: moodHistory,
    push: pushMood,
    clear: clearMoodHistory,
  } = useMoodHistory();
  const { setRating, getRating } = useRatings();
  const overlay = useSearchOverlay();

  /* ---------- Splash ---------- */
  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 1700);
    return () => clearTimeout(t);
  }, []);

  /* ---------- Open details modal (with origin for animation) ---------- */
  const openDetails = useCallback(
    (movie, e) => {
      let origin = { x: 50, y: 50 };
      if (e?.currentTarget) {
        const r = e.currentTarget.getBoundingClientRect();
        origin = {
          x: ((r.left + r.width / 2) / window.innerWidth) * 100,
          y: ((r.top + r.height / 2) / window.innerHeight) * 100,
        };
      }
      setModalOrigin(origin);
      setSelectedMovie(movie);
      setAtmosphere({ c1: movie.c1, c2: movie.c2 });
    },
    [setAtmosphere]
  );

  /* ---------- Search system ---------- */
  const searchApi = useSearch({
    onSelectMovie: (movie) => openDetails(movie),
    onSelectMood: (moodId) => {
      setView('moods');
      setActiveMood(moodId);
      pushMood(moodId);
    },
    onNavigateToMovies: (term) => {
      setSearch(term);
      setView('movies');
    },
  });

  /* ---------- Atmosphere callbacks ---------- */
  const handleHoverMovie = useCallback(
    (movie) => {
      if (movie) setAtmosphere({ c1: movie.c1, c2: movie.c2 });
    },
    [setAtmosphere]
  );

  const handleHoverMood = useCallback(
    (mood) => {
      if (mood) setAtmosphere({ c1: mood.c1, c2: mood.c2 });
    },
    [setAtmosphere]
  );

  /* ---------- Mood selection (also records to history) ---------- */
  const handleSelectMood = useCallback(
    (id) => {
      setActiveMood(id);
      if (id) pushMood(id);
    },
    [pushMood]
  );

  /* ---------- Watchlist toggle + toast ---------- */
  const handleAddToWatchlist = useCallback(
    (id) => {
      const wasIn = hasInWatchlist(id);
      toggleWatchlist(id);
      toast(wasIn ? 'Removed from watchlist' : 'Added to watchlist');
    },
    [toggleWatchlist, hasInWatchlist]
  );

  /* ---------- Rating + toast ---------- */
  const handleRate = useCallback(
    (id, value) => {
      setRating(id, value);
      if (value > 0) toast(`Rated ${value} ★`);
      else toast('Rating cleared');
    },
    [setRating]
  );

  return (
    <div className="atmosphere min-h-screen">
      {splash && <SplashScreen />}

      {/* Cinema mode vignette + letterbox bars */}
      <CinemaVignette active={cinemaMode} />

      <Navbar
        view={view}
        onNavigate={setView}
        cinemaMode={cinemaMode}
        onToggleCinema={toggleCinema}
        search={search}
        onSearch={setSearch}
        onTonightsPick={(m) => openDetails(m)}
        onSelectMovie={searchApi.selectMovie}
        onSelectMood={searchApi.selectMood}
        onNavigateToMovies={searchApi.selectQuery}
        recents={searchApi.recents}
        onClearRecents={searchApi.clearRecents}
        onOpenSearch={() => overlay.setOpen(true)}
      />

      {/* Floating watchlist button */}
      <button
        onClick={() => setWatchlistOpen(true)}
        className={cn(
          'fixed z-30 top-20 right-6 w-11 h-11 rounded-full',
          'glass flex items-center justify-center',
          'hover:scale-110 active:scale-95 transition-transform',
          'shadow-[0_8px_30px_rgba(0,0,0,0.4)]',
          cinemaMode && 'opacity-40'
        )}
        aria-label={`Open watchlist (${watchlist.length} items)`}
      >
        <IconBookmark size={16} style={{ color: 'var(--text)' }} />
        {watchlist.length > 0 && (
          <span
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center px-1"
            style={{ background: 'var(--violet)', color: 'white' }}
          >
            {watchlist.length}
          </span>
        )}
      </button>

      {/* Main content — dimmed in cinema mode */}
      <main
        className={cn(
          'transition-all duration-500',
          cinemaMode && 'opacity-35 saturate-50'
        )}
      >
        {view === 'home' && (
          <HomeView
            onOpen={openDetails}
            onPlayTrailer={setTrailerMovie}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onHoverMovie={handleHoverMovie}
            activeMood={activeMood}
            onSelectMood={handleSelectMood}
            onHoverMood={handleHoverMood}
            moodHistory={moodHistory}
            onClearMoodHistory={clearMoodHistory}
            onAddToWatchlist={handleAddToWatchlist}
          />
        )}

        {view === 'movies' && (
          <MoviesView
            onOpen={openDetails}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onHoverMovie={handleHoverMovie}
            search={search}
          />
        )}

        {view === 'moods' && (
          <MoodsView
            onOpen={openDetails}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onHoverMovie={handleHoverMovie}
            onHoverMood={handleHoverMood}
            activeMood={activeMood}
            onSelectMood={handleSelectMood}
          />
        )}

        {view === 'vibematch' && <VibeMatchView onOpen={openDetails} />}

        {view === 'favorites' && (
          <FavoritesView
            onOpen={openDetails}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onHoverMovie={handleHoverMovie}
          />
        )}
      </main>

      <Footer onNavigate={setView} />

      {/* Floating AI chat */}
      <AIChat onOpen={openDetails} onAtmosphere={setAtmosphere} />

      {/* Watchlist drawer */}
      <Watchlist
        open={watchlistOpen}
        onClose={() => setWatchlistOpen(false)}
        watchlist={watchlist}
        onRemove={removeWatchlist}
        onClear={clearWatchlist}
        onOpenMovie={openDetails}
      />

      {/* Search overlay (⌘K / Ctrl+K) */}
      <SearchOverlay
        open={overlay.open}
        onClose={overlay.close}
        query={searchApi.query}
        onQueryChange={searchApi.setQuery}
        recents={searchApi.recents}
        onClearRecents={searchApi.clearRecents}
        onSelectMovie={searchApi.selectMovie}
        onSelectMood={searchApi.selectMood}
        onSelectQuery={searchApi.selectQuery}
      />

      {/* Details modal */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          origin={modalOrigin}
          onClose={() => setSelectedMovie(null)}
          onPlayTrailer={setTrailerMovie}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          rating={getRating(selectedMovie.id)}
          onRate={(v) => handleRate(selectedMovie.id, v)}
          inWatchlist={hasInWatchlist(selectedMovie.id)}
          onToggleWatchlist={() => handleAddToWatchlist(selectedMovie.id)}
        />
      )}

      {/* Trailer modal */}
      {trailerMovie && (
        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AtmosphereProvider>
        <FavoritesProvider>
          <ToastProvider>
            <AppShell />
          </ToastProvider>
        </FavoritesProvider>
      </AtmosphereProvider>
    </ThemeProvider>
  );
}