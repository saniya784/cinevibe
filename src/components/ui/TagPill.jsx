export function TagPill({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 border border-white/14 bg-white/5 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs ${className}`}
    >
      {children}
    </span>
  );
}