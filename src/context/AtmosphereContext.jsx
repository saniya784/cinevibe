import { createContext, useContext } from 'react';
import { useAtmosphere } from '@/hooks/useAtmosphere';

const AtmosphereContext = createContext(null);

export function AtmosphereProvider({ children }) {
  const value = useAtmosphere();
  return <AtmosphereContext.Provider value={value}>{children}</AtmosphereContext.Provider>;
}

export function useAtmosphereContext() {
  const ctx = useContext(AtmosphereContext);
  if (!ctx) throw new Error('useAtmosphereContext must be used within AtmosphereProvider');
  return ctx;
}