export function MoodTile({ mood, active, onClick, onHover, index = 0 }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover?.(mood)}
      onMouseLeave={() => onHover?.(null)}
      className="relative rounded-2xl p-4 text-left overflow-hidden border group"
      style={{
        borderColor: active ? mood.c1 : 'var(--line)',
        background: active
          ? `linear-gradient(135deg, ${mood.c1}55, ${mood.c2})`
          : 'var(--surface)',
        animation: `float3d ${3 + index * 0.2}s ease-in-out infinite`,
        animationDelay: `${index * 0.15}s`,
        transform: active ? 'translateY(-5px)' : undefined,
        boxShadow: active ? `0 10px 25px -8px ${mood.c1}66` : undefined,
        transition:
          'transform .35s cubic-bezier(.2,.9,.25,1), border-color .25s, background .3s, box-shadow .3s',
      }}
    >
      <div
        className="text-3xl mb-3 group-hover:animate-spin-3d inline-block"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {mood.emoji}
      </div>
      <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
        {mood.label}
      </div>
      <div
        className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
        style={{
          background: mood.c1,
          opacity: active ? 1 : 0.3,
          boxShadow: active ? `0 0 10px ${mood.c1}` : 'none',
        }}
      />
    </button>
  );
}