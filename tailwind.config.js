/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          }
        }
      },
      animation: {
        'waving-hand': 'wave 0.8s ease-in ',
      },
      width: {
        '134': '8.375rem',
      },
      backgroundSize: {
        '100%': '100%',
      }
    },
  },
  plugins: [],
}
