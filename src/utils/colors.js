export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const bigint = parseInt(
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h,
    16
  );
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

export function rgbString(hex) {
  return hexToRgb(hex).join(',');
}