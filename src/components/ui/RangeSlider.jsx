export function RangeSlider({ label, value, onChange, lo, hi }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        <span style={{ color: 'var(--text)' }}>{label}</span>
        <span className="text-[var(--text-dim)] text-xs">
          {value} / 10
        </span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[11px] text-[var(--text-faint)] mt-1">
        <span>{lo}</span>
        <span>{hi}</span>
      </div>
    </div>
  );
}