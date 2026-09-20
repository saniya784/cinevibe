import { MovieHero } from '@/components/movie/MovieHero';
import { MovieRail } from '@/components/movie/MovieRail';
import { MoodSelector } from '@/components/mood/MoodSelector';
import { VibeMatch } from '@/components/features/VibeMatch';
import { MoodMixer } from '@/components/features/MoodMixer';
import { MoodHistory } from '@/components/features/MoodHistory';
import { MOVIES } from '@/data/movies';
import { getMoodById } from '@/data/moods';

export function HomeView({
  onOpen,
  onPlayTrailer,
  favorites,
  onToggleFavorite,
  onHoverMovie,
  activeMood,
  onSelectMood,
  onHoverMood,
  moodHistory,
  onClearMoodHistory,
  onAddToWatchlist,
}) {
  const moodPicks = activeMood
    ? MOVIES.filter((m) => m.moods.includes(activeMood))
    : null;

  const trending = [...MOVIES].sort((a, b) => b.score - a.score).slice(0, 8);
  const scifi = MOVIES.filter((m) => m.genres.includes('Sci-Fi'));
  const adrenaline = MOVIES.filter((m) => m.moods.includes('adrenaline'));
  const emotional = MOVIES.filter((m) => m.moods.includes('emotional'));

  const railProps = {
    onOpen,
    favorites,
    onToggleFavorite,
    onHoverMovie,
  };

  return (
    <div>
      <MovieHero
        onOpen={onOpen}
        onPlayTrailer={onPlayTrailer}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onAddToWatchlist={onAddToWatchlist}
      />

      <div className="pt-14">
        <MoodHistory
          history={moodHistory}
          onSelect={onSelectMood}
          onClear={onClearMoodHistory}
        />

        <MoodSelector
          activeMood={activeMood}
          onSelect={onSelectMood}
          onHoverMood={onHoverMood}
        />

        {moodPicks ? (
          <MovieRail
            title={`${getMoodById(activeMood).label} picks`}
            movies={moodPicks}
            {...railProps}
          />
        ) : (
          <>
            <MovieRail
              title="Trending Now"
              subtitle="What everyone's watching this week"
              movies={trending}
              {...railProps}
            />
            <MovieRail title="Mind-Bending Sci-Fi" movies={scifi} {...railProps} />
            <MovieRail title="Pure Adrenaline" movies={adrenaline} {...railProps} />
          </>
        )}

        <VibeMatch onOpen={onOpen} />
        <MoodMixer onOpen={onOpen} />
        <MovieRail title="Emotional Gut-Punches" movies={emotional} {...railProps} />
      </div>
    </div>
  );
}