/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    extend: {
      colors: {
        primary: "#448BF7",
        secondary: "#FF653C",
        hoverPrimary: "#f94514",
        hoverSecondary: "#246DEF",
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