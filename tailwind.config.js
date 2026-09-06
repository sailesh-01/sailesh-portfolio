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
        canvas: {
          DEFAULT: '#0a0f1d',
          deep: '#060913',
          surface: '#10172a',
          card: '#131e36',
          border: 'rgba(56, 189, 248, 0.12)',
        },
        cyber: {
          DEFAULT: '#38bdf8',
          glow: 'rgba(56, 189, 248, 0.35)',
          dim: 'rgba(56, 189, 248, 0.1)',
        },
        neural: {
          DEFAULT: '#10b981',
          glow: 'rgba(16, 185, 129, 0.35)',
          dim: 'rgba(16, 185, 129, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
