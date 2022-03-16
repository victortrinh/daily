/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const plugin = require('tailwindcss/plugin');

const Colors = {
  error: '#B00020',
  beige: '#E8DFC8',
  black: '#2F2F2F',
  white: '#F9F6F0',
  yellow: '#FDE9C6',
  green: '#BADE9E',
  purple: '#BBC1FC',
  brown: '#DCD2D0',
  violet: '#DECAED',
  orange: '#F8C4C6',
};

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        default: '0 0 16px 0 rgba(0, 0, 0, 0.2)',
      },
    },
    colors: {
      dark: '#121212',
      error: Colors.error,
      beige: Colors.beige,
      black: Colors.black,
      white: Colors.white,
      yellow: Colors.yellow,
      green: Colors.green,
      purple: Colors.purple,
      brown: Colors.brown,
      violet: Colors.violet,
      orange: Colors.orange,
    },
  },
  plugins: [
    plugin(({
      addBase, addComponents, addUtilities, theme,
    }) => {
      addBase({
        h2: {
          fontSize: theme('fontSize.xl'),
          marginBottom: theme('spacing.4'),
          fontWeight: '600',
        },
        h3: {
          fontSize: theme('fontSize.lg'),
          marginTop: theme('spacing.4'),
          marginBottom: theme('spacing.2'),
          fontWeight: '600',
        },
      });
    }),
  ],
};
