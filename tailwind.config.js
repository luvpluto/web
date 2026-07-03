/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Arial Narrow"', '"Roboto Condensed"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        body: ['Inter', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        title: '0.02em',
      },
      colors: {
        accent: {
          DEFAULT: '#ec8aa3',
          soft: '#ffd2dd',
          deep: '#b95f78',
        },
      },
      boxShadow: {
        glow: '0 0 32px rgba(236, 138, 163, 0.22), 0 0 90px rgba(236, 138, 163, 0.13)',
      },
    },
  },
  plugins: [],
};
