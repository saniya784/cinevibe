import { cn } from '@/utils/cn';

const VARIANTS = {
  primary:
    'bg-[var(--text)] text-[var(--ink)] font-semibold hover:bg-white hover:-translate-y-px hover:shadow-lg active:translate-y-0',
  ghost:
    'bg-white/8 text-[var(--text)] backdrop-blur-xl border border-white/12 hover:bg-white/16 hover:-translate-y-px',
  icon: 'bg-white/8 border border-white/12 hover:bg-white/16',
  solid:
    'bg-[var(--violet)] text-white hover:brightness-110 hover:-translate-y-px',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs rounded-full',
  md: 'px-5 py-2.5 text-sm rounded-full',
  lg: 'px-6 py-3 text-sm rounded-full',
  icon: 'w-10 h-10 rounded-full',
  iconSm: 'w-8 h-8 rounded-full',
};

export function Button({
  variant = 'ghost',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}