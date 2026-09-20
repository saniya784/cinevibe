import { useState } from 'react';
import { IconStar } from '@/components/ui/Icon';
import { cn } from '@/utils/cn';

export function RatingWidget({
  movieId,
  value = 0,
  onChange,
  size = 20,
  readOnly = false,
  className,
}) {
  const [hovered, setHovered] = useState(0);

  const display = hovered || value;

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      onMouseLeave={() => setHovered(0)}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={readOnly ? `Rating: ${value} of 5` : 'Rate this movie'}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= display;
        return (
          <button
            key={n}
            onClick={() => !readOnly && onChange?.(n === value ? 0 : n)}
            onMouseEnter={() => !readOnly && setHovered(n)}
            disabled={readOnly}
            className={cn(
              'transition-all duration-200',
              !readOnly && 'hover:scale-125 cursor-pointer',
              readOnly && 'cursor-default',
              filled ? 'text-[var(--gold)]' : 'text-[var(--text-faint)]'
            )}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            aria-checked={n === value}
            role={readOnly ? 'presentation' : 'radio'}
          >
            <IconStar
              size={size}
              style={{
                filter: filled
                  ? 'drop-shadow(0 0 6px rgba(232,182,76,0.6))'
                  : 'none',
                transform: n === hovered ? 'scale(1.15)' : 'scale(1)',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}