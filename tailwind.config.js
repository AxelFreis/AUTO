/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9B0B0B',
          dark: '#7A0909',
          light: '#B81010',
        },
        background: {
          DEFAULT: '#0F0F0F',
          card: '#1A1A1A',
          elevated: '#252525',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
};
