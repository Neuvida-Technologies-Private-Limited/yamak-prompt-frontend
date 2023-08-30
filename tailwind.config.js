/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF653C',
        secondary: '#448BF7',
        hoverPrimary: '#f94514',
        hoverSecondary: '#246DEF',
        bgSecondary: '#FCF8F8',
        black: '#1D1D1D',
        gray800: '#2D313F',
        gray500: '#D6E4EC',
        gray400: '#1d1d1d66',
        gray100: '#FBFBFB',
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
