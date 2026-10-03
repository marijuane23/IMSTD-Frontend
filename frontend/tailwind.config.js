/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        celebrate: {
          blue: '#2f6bff',
          gold: '#ffb020',
          rose: '#ff5f8f',
          mint: '#39e0c4',
          paleGold: '#ffe08a',
          paleBlue: '#9bc0ff',
        },
        imstd: {
          blue: {
            DEFAULT: '#7EB9F3',
            50: '#f0f7ff',
            100: '#daeeff',
            200: '#bde0ff',
            400: '#7EB9F3',
            500: '#5aa3ed',
            600: '#3a8de0',
            700: '#2471c7',
            800: '#1a56a0',
            900: '#0f3a70',
            950: '#082248',
          },
          black: '#000000',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
