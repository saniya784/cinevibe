import { forwardRef, useEffect, useRef, useState } from 'react';
import { IconSearch, IconX } from './Icon';
import { cn } from '@/utils/cn';

export const SearchBar = forwardRef(function SearchBar(
  { value, onChange, placeholder = 'Search…', className, onFocusChange },
  ref
) {
  const [focused, setFocused] = useState(false);
  const localRef = useRef(null);
  const inputRef = ref || localRef;

  useEffect(() => {
    onFocusChange?.(focused);
  }, [focused, onFocusChange]);

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300',
        'bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl',
        'border border-white/12 shadow-lg',
        focused &&
          'border-[var(--violet)]/60 shadow-[0_0_0_3px_rgba(255,116,82,0.15)]',
        className
      )}
    >
      <IconSearch
        size={15}
        className={cn(
          'transition-colors shrink-0',
          focused ? 'text-[var(--violet)]' : 'text-[var(--text-faint)]'
        )}
      />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm placeholder:text-[var(--text-faint)] w-full min-w-0"
        style={{ color: 'var(--text)' }}
        aria-label="Search movies"
      />
      {value && (
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onChange('')}
          className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors shrink-0"
          aria-label="Clear search"
        >
          <IconX size={13} />
        </button>
      )}
      <kbd
        className={cn(
          'hidden md:inline-flex shrink-0 items-center px-1.5 py-0.5 rounded text-[10px] font-mono',
          'border border-[var(--line)] text-[var(--text-faint)]',
          value && 'hidden'
        )}
      >
        /
      </kbd>
    </div>
  );
});