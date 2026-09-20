import { useRef, useState } from 'react';
import { IconShuffle } from '@/components/ui/Icon';
import { MOVIES } from '@/data/movies';

export function TonightsPick({ onReveal }) {
  const [spinning, setSpinning] = useState(false);
  const timerRef = useRef(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    let count = 0;
    const total = 18;
    timerRef.current = setInterval(() => {
      count++;
      if (count >= total) {
        clearInterval(timerRef.current);
        const pick = MOVIES[Math.floor(Math.random() * MOVIES.length)];
        setSpinning(false);
        onReveal(pick);
      }
    }, 90);
  };

  return (
    <button
      onClick={spin}
      className="bg-white/8 border border-white/12 backdrop-blur-xl px-5 py-2.5 rounded-full flex items-center gap-2 text-sm hover:bg-white/16 transition-colors"
    >
      <IconShuffle size={15} className={spinning ? 'animate-spin' : ''} /> Tonight's Pick
    </button>
  );
}