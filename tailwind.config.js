/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#448BF7',
        secondary: '#FF653C',
        hoverPrimary: '#f94514',
        hoverSecondary: '#246DEF',
        bgSecondary: '#FCF8F8',
        black: '#1D1D1D',
        gray800: '#2D313F',
        gray400: '#1d1d1d66',
      },
      fontFamily: {
        rubik: "'Rubik', serif",
        poppins: "'Poppins', serif",
        josefins: "'Josefin Sans', sans-serif",
        barlow: "'Barlow', sans-serif",
        raleway: "'Raleway', sans-serif",
      },
      screens: {
        sm: '320px',
        md: '768px',
        lg: '1440px',
      },
    },
  },
  plugins: [],
};
