import { useState } from 'react';
import {
  IconFilm,
  IconGithub,
  IconInstagram,
  IconSend,
  IconSparkle,
  IconTwitter,
} from '@/components/ui/Icon';
import { cn } from '@/utils/cn';

const EXPLORE = [
  { id: 'home', label: 'Home' },
  { id: 'movies', label: 'Movies' },
  { id: 'moods', label: 'Moods' },
  { id: 'vibematch', label: 'Vibe Match' },
  { id: 'favorites', label: 'Favorites' },
];

const GENRES = [
  'Sci-Fi',
  'Thriller',
  'Drama',
  'Action',
  'Romance',
  'Animation',
];

const SOCIALS = [
  { Icon: IconTwitter, label: 'Twitter', href: '#' },
  { Icon: IconInstagram, label: 'Instagram', href: '#' },
  { Icon: IconGithub, label: 'GitHub', href: '#' },
];

/**
 * Footer
 * Rich multi-column footer featuring:
 *  - Brand + tagline + socials
 *  - Explore navigation column
 *  - Genre browse column
 *  - Newsletter subscription with success state
 *  - Legal row with animated status dot
 */
export function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3200);
  };

  return (
    <footer
      className={cn(
        'mt-20 relative overflow-hidden',
        'border-t border-[var(--line)]',
        'footer-rich'
      )}
    >
      {/* Decorative top gradient line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,116,82,0.35), rgba(255,255,255,0.12), rgba(255,116,82,0.35), transparent)',
        }}
      />

      <div className="px-6 sm:px-10 pt-16 pb-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IconFilm size={22} className="text-[var(--violet)]" />
              <span
                className="font-display text-2xl"
                style={{ fontWeight: 600, color: 'var(--text)' }}
              >
                CineVibe
              </span>
            </div>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed mb-5">
              Discover your next obsession. Mood-aware movie recommendations,
              curated for how you want to feel.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={cn(
                    'w-9 h-9 rounded-full glass flex items-center justify-center',
                    'text-[var(--text-dim)] hover:text-[var(--violet)]',
                    'hover:scale-110 transition-all duration-300',
                    'hover:shadow-[0_0_20px_rgba(255,116,82,0.25)]'
                  )}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore column */}
          <FooterColumn
            title="Explore"
            items={EXPLORE}
            onItemClick={(item) => onNavigate(item.id)}
          />

          {/* Genres column */}
          <FooterColumn
            title="Genres"
            items={GENRES.map((g) => ({ id: 'movies', label: g }))}
            onItemClick={() => onNavigate('movies')}
          />

          {/* Newsletter column */}
          <div>
            <h4
              className="font-display text-lg mb-4"
              style={{ fontWeight: 600, color: 'var(--text)' }}
            >
              Stay in the loop
            </h4>
            <p className="text-sm text-[var(--text-dim)] mb-4 leading-relaxed">
              Get weekly mood-based recommendations delivered to your inbox.
            </p>

            <div
              className={cn(
                'flex items-center gap-2 rounded-full px-3 py-2 mb-3',
                'bg-white/5 border border-[var(--line)]',
                'focus-within:border-[var(--violet)]/60',
                'focus-within:shadow-[0_0_0_3px_rgba(255,116,82,0.15)]',
                'transition-all'
              )}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                placeholder="your@email.com"
                aria-label="Email address"
                className="bg-transparent outline-none text-sm w-full placeholder:text-[var(--text-faint)]"
                style={{ color: 'var(--text)' }}
              />
              <button
                onClick={handleSubscribe}
                className={cn(
                  'w-8 h-8 rounded-full shrink-0 flex items-center justify-center',
                  'bg-[var(--violet)] text-white',
                  'hover:scale-110 active:scale-95 transition-transform'
                )}
                aria-label="Subscribe"
              >
                <IconSend size={12} />
              </button>
            </div>

            {subscribed && (
              <div className="text-xs text-[var(--violet)] flex items-center gap-1.5 animate-fade-slide">
                <IconSparkle size={12} />
                Thanks! You're subscribed.
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            'max-w-6xl mx-auto pt-8 border-t border-[var(--line)]',
            'flex flex-col sm:flex-row items-center justify-between gap-4',
            'text-xs text-[var(--text-faint)]'
          )}
        >
          <span className="text-center sm:text-left">
            © 2024 CineVibe — A concept discovery platform. Posters are stylized
            simulations.
          </span>
          <div className="flex items-center gap-6">
            <button className="hover:text-[var(--text-dim)] transition-colors">
              Privacy
            </button>
            <button className="hover:text-[var(--text-dim)] transition-colors">
              Terms
            </button>
            <span className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                style={{ background: 'var(--violet)' }}
              />
              Built with React &amp; Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items, onItemClick }) {
  return (
    <div>
      <h4
        className="font-display text-lg mb-4"
        style={{ fontWeight: 600, color: 'var(--text)' }}
      >
        {title}
      </h4>
      <ul className="space-y-3 text-sm">
        {items.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => onItemClick?.(item)}
              className={cn(
                'group flex items-center gap-2 transition-colors',
                'text-[var(--text-dim)] hover:text-[var(--violet)]'
              )}
            >
              <span
                className={cn(
                  'w-1 h-1 rounded-full bg-[var(--violet)]',
                  'opacity-0 group-hover:opacity-100 transition-opacity'
                )}
              />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}