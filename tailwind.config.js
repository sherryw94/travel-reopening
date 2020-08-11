module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  theme: {
    fontFamily: {
      body: ['Gilroy', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#1c355e',
        secondary: '#d50037',
        'secondary-light': '#f3dbe1',
        'state-open': '#00916e',
        'state-partial': '#ffc857',
        tertiary: '#307582',
        'tertiary-lighter': '#d2e8eb',
        'tertiary-light': '#bae2df',
        'warm-gray-50': '#f9fafb',
      },
      inset: {
        12: '48px',
      },
      spacing: {
        0.5: '.125rem',
        2.5: '.625rem',
      },
      gridTemplateColumns: {
        legend: '1fr auto',
      },
    },
  },
  variants: {},
  plugins: [],
};
