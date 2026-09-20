import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  IconMute,
  IconPause,
  IconPlay,
  IconVolume,
  IconX,
} from '@/components/ui/Icon';
import { getMovieImage } from '@/data/images';

export function TrailerModal({ movie, onClose }) {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.6)), 100);
    return () => clearInterval(t);
  }, [playing]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!movie) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-10"
      style={{ animation: 'backdropIn .35s ease both' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10"
        style={{ animation: 'modalGrow .45s cubic-bezier(.2,.9,.25,1) both' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(120deg, ${movie.c1}aa, ${movie.c2}cc), url(${getMovieImage(movie)})`,
            animation: 'kenburns 10s ease-in-out infinite alternate',
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div className="text-white font-display text-lg drop-shadow-lg">
            {movie.title} — Trailer
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80"
            aria-label="Close trailer"
          >
            <IconX size={16} />
          </button>
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white border border-white/30 hover:bg-white/25 transition-all hover:scale-110"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <IconPause size={26} /> : <IconPlay size={26} />}
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <div className="h-1.5 bg-white/20 rounded-full mb-3 overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%`, transition: 'width .1s linear' }}
            />
          </div>
          <div className="flex items-center justify-between text-white/90 text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="hover:scale-110 transition-transform"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <IconPause size={16} /> : <IconPlay size={16} />}
              </button>
              <button
                onClick={() => setMuted((m) => !m)}
                className="hover:scale-110 transition-transform"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? <IconMute size={16} /> : <IconVolume size={16} />}
              </button>
            </div>
            <span>Simulated cinematic preview</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}