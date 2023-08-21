/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    extend: {
      colors: {
        regalblue: "#448BF7",
        vividTangerine: "#FF653C",
        internationalOrange: "#f94514",
        activeBlue: "#246DEF",
      },
      fontFamily: {
        rubik: "'Rubik', serif",
        poppins: "'Poppins', serif",
        josefins: "'Josefin Sans', sans-serif",
        barlow: "'Barlow', sans-serif",
        raleway: "'Raleway', sans-serif",
      },
    },
  },
  plugins: [],
}