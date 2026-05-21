/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        plum: '#3b1f6e',
        'plum-mid': '#52308f',
        purple: '#7c4dbd',
        'purple-lt': '#a97de0',
        lilac: '#e8dcff',
        'off-white': '#f8f7ff',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
