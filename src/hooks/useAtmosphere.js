import { useEffect, useState } from 'react';
import { hexToRgb } from '@/utils/colors';

export function useAtmosphere() {
  const [target, setTarget] = useState({ c1: '#8b6cff', c2: '#050812' });

  useEffect(() => {
    const [r, g, b] = hexToRgb(target.c1);
    document.documentElement.style.setProperty('--atmo-a', `${r},${g},${b}`);
  }, [target]);

  return [target, setTarget];
}