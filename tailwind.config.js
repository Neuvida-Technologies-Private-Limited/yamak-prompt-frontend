/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF653C',
        secondary: '#0923A6',
        hoverPrimary: '#f94514',
        hoverSecondary: '#246DEF',
        bgSecondary: '#FCF8F8',
        black: '#1D1D1D',
        white: '#ffffff',
        gray800: '#2D313F',
        gray600: '#AEAEAE',
        gray500: '#D6E4EC',
        gray400: '#1d1d1d66',
        gray200: '#f4f4f4',
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
        em: '960px',
        lg: '1340px',
      },
    },
  },
  plugins: [],
};
