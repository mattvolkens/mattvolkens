import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAF7',
        ink: '#1A1A1A',
        forest: '#1B4332',
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
        widest: '0.15em',
      },
    },
  },
  plugins: [],
} satisfies Config
