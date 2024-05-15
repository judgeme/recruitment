/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#151124',
        secondary: '#52F597',
        danger: 'red',
        'black-80': '#313131',
        'black-70': '#080808',
        'grey-40': '#929292',
        'grey-60': '#e1e1e1',
        'grey-80': '#999999',
        'grey-light': '#f3f3f3',
        'grey-deep': '#555555',
        fairy: '#fafafa'
      },
      spacing: {
        13: '52px',
        15: '60px',
        18: '72px',
        25: '100px',
        30: '120px',
        27: '108px',
        29: '116px',
        50: '200px',
        100: '400px'
      },
      fontSize: {
        tiny: ['12px', '30px'],
        small: ['10px', '25px'],
        anchor: ['13px', '25px'],
        input: ['13px', '18px'],
        link: ['12px', '23px'],
        'heading-3': ['24px', {
          lineHeight: '36px',
          letterSpacing: '2px',
        }],
      },
      letterSpacing: {
        compact: '1.8px',
        mono: '1px',
        double: '2px',
        link: '1.2px'
      },
      fontFamily: {
        inherit: 'inherit'
      }
    }
  },
  plugins: []
};
