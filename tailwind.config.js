/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: 'var(--ink)',
        surface: 'var(--surface)',
        violet: 'var(--violet)',
        ember: 'var(--ember)',
        gold: 'var(--gold)',
      },
      animation: {
        'float-3d': 'float3d 5s ease-in-out infinite',
        'spin-3d': 'spin3d 1.2s cubic-bezier(.2,.9,.25,1) forwards',
        'poster-glow': 'posterGlow 5s ease-in-out infinite alternate',
        'fade-slide': 'fadeSlideIn 0.7s cubic-bezier(.16,1,.3,1) both',
        'shimmer': 'shimmerMove 2.4s linear infinite',
        'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};