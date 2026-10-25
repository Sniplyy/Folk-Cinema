/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#141210',
          elevated: '#1C1917',
          surface: '#231F1C',
          border: '#2C2723',
        },
        cream: {
          DEFAULT: '#F1E9DA',
          muted: '#C7BFA6',
          dim: '#9B9483',
        },
        terracotta: {
          DEFAULT: '#D4552B',
          hover: '#BA461F',
          dark: '#8C3214',
        },
        olive: {
          DEFAULT: '#6B6B3A',
          muted: '#52522C',
        },
        sand: {
          DEFAULT: '#D9C9A8',
          muted: '#B8A887',
        },
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        sans: ['"Instrument Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        devanagari: ['"Tiro Devanagari Hindi"', 'Archivo', 'sans-serif'],
      },
      lineHeight: {
        'tight-display': '0.86',
        'extra-tight': '0.82',
      },
      letterSpacing: {
        'condensed-display': '-0.04em',
        'mono-wide': '0.14em',
        'mono-widest': '0.22em',
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
      },
    },
  },
  plugins: [],
}
