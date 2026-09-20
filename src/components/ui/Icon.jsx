export const Icon = ({
  path,
  size = 20,
  className = '',
  fill = 'none',
  stroke = 'currentColor',
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={fill}
    stroke={stroke}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={path} />
  </svg>
);

export const IconPlay = (p) => <Icon {...p} fill="currentColor" stroke="none" path="M8 5v14l11-7z" />;
export const IconInfo = (p) => (
  <Icon
    {...p}
    path="M12 16v-4M12 8h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
  />
);
export const IconHeart = (p) => (
  <Icon
    {...p}
    path="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
  />
);
export const IconHeartFilled = (p) => (
  <Icon
    {...p}
    fill="currentColor"
    stroke="none"
    path="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
  />
);
export const IconSearch = (p) => (
  <Icon {...p} path="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35" />
);
export const IconX = (p) => <Icon {...p} path="M18 6 6 18M6 6l12 12" />;
export const IconSparkle = (p) => (
  <Icon
    {...p}
    path="M12 3l1.8 5.3L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.7L12 3zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"
  />
);
export const IconShuffle = (p) => (
  <Icon {...p} path="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
);
export const IconMenu = (p) => <Icon {...p} path="M4 7h16M4 12h16M4 17h16" />;
export const IconChevL = (p) => <Icon {...p} path="M15 18l-6-6 6-6" />;
export const IconChevR = (p) => <Icon {...p} path="M9 18l6-6-6-6" />;
export const IconSend = (p) => (
  <Icon {...p} path="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
);
export const IconClock = (p) => (
  <Icon {...p} path="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2" />
);
export const IconStar = (p) => (
  <Icon
    {...p}
    fill="currentColor"
    stroke="none"
    path="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2l-5-4.9 6.9-1L12 2z"
  />
);
export const IconFilm = (p) => (
  <Icon {...p} path="M4 4h16v16H4zM4 9h16M4 15h16M9 4v16M15 4v16" />
);
export const IconMoon = (p) => (
  <Icon {...p} path="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
);
export const IconVolume = (p) => <Icon {...p} path="M4 9v6h4l5 5V4l-5 5H4z" />;
export const IconMute = (p) => (
  <Icon {...p} path="M4 9v6h4l5 5V4l-5 5H4zM17 9l5 5M22 9l-5 5" />
);
export const IconPause = (p) => (
  <Icon {...p} fill="currentColor" stroke="none" path="M6 5h4v14H6zM14 5h4v14h-4z" />
);
export const IconGithub = (p) => (
  <Icon
    {...p}
    path="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
  />
);
export const IconTwitter = (p) => (
  <Icon
    {...p}
    path="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
  />
);
export const IconInstagram = (p) => (
  <Icon
    {...p}
    path="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M3 8a5 5 0 015-5h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8z"
  />
);
export const IconSun = (p) => (
  <Icon
    {...p}
    path="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
  />
);
export const IconChevD = (p) => <Icon {...p} path="M6 9l6 6 6-6" />;
export const IconPlus = (p) => <Icon {...p} path="M12 5v14M5 12h14" />;
export const IconTrash = (p) => (
  <Icon {...p} path="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
);
export const IconBookmark = (p) => (
  <Icon {...p} path="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
);
export const IconBookmarkFilled = (p) => (
  <Icon {...p} fill="currentColor" stroke="none" path="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
);