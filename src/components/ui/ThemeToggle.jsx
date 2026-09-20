export function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-11 h-6 rounded-full bg-white/10 border border-white/15 transition-colors duration-300 flex-shrink-0"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div
        className="absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] transition-transform duration-300"
        style={{
          background: 'var(--text)',
          transform: theme === 'light' ? 'translateX(20px)' : 'translateX(0)',
        }}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>
    </button>
  );
}