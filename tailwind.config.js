/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-gold': '#FFC700',
        'primary-dark-blue-gray': '#1E293B',
        'secondary-white': '#FFFFFF',
        'secondary-light-blue': '#818CF8',
        'neutral-light-gray': '#F3F4F6',
        'neutral-very-light-gray': '#E2E8F0',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
