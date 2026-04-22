/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d8eaff',
          200: '#badbff',
          300: '#8fc4ff',
          400: '#5aa4ff',
          500: '#3182f6',
          600: '#1d67d8',
          700: '#1754af',
          800: '#19498d',
          900: '#1a3f73'
        }
      },
      boxShadow: {
        soft: '0 16px 40px rgba(15, 23, 42, 0.08)'
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
};
