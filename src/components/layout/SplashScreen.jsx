import { IconFilm } from '@/components/ui/Icon';

export function SplashScreen() {
  return (
    <div
      className="fixed inset-0 z-[100] bg-[#050812] flex items-center justify-center"
      style={{ animation: 'splashOut 0.6s ease 1.1s both' }}
    >
      <div className="flex items-center gap-3" style={{ animation: 'splashLogo 1.1s cubic-bezier(.2,.9,.25,1) both' }}>
        <IconFilm size={26} className="text-[var(--violet)]" />
        <span
          className="font-display text-3xl text-white"
          style={{ fontWeight: 600 }}
        >
          CineVibe
        </span>
      </div>
    </div>
  );
}