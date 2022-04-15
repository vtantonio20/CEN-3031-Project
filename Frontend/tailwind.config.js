module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'xs': '425px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '818px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        inter: ['Inter'],
        nunito: ['Nunito']
      },
      screen: {
        'notMediumButAlmostLarge': '820px',
        // => @media (min-width: 375px) { ... }
      },
      colors:{
        darker: '#181818',
        grayer: '#36393F',

      }
    },
  },
  plugins: [],
}
