module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        grey: {
          100: '#C4C4C4',
          200: '#8D8C8A',
          300: '#575757',
        },
        green: '#7FA650',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
