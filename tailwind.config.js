/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1B1210',
        maroon: {
          DEFAULT: '#7A1B24',
          dark: '#5C1119',
          light: '#9A2D38'
        },
        cream: '#F7F2EA',
        paper: '#FFFFFF',
        stone: '#6B6058',
        hairline: '#E4DDD1'
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        content: '1180px'
      }
    }
  },
  plugins: []
};
