/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#14161b',
        primary: '#1f2937',
        crimson: {
          DEFAULT: '#dc2626',
          glow: '#ef4444',
          dim: '#991b1b',
        },
        ivory: '#f5f5f0',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        editorial: ['"Newsreader"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-ping': 'pulsePing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-desaturate': 'fadeDesaturate 8s ease-in-out infinite',
        'grain-shift': 'grainShift 0.5s steps(4) infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
      },
      keyframes: {
        pulsePing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.8)', opacity: '0' },
        },
        fadeDesaturate: {
          '0%, 100%': { filter: 'grayscale(0.3) opacity(0.85)' },
          '50%': { filter: 'grayscale(1) opacity(0.6)' },
        },
        grainShift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-2%, -1%)' },
          '50%': { transform: 'translate(1%, 2%)' },
          '75%': { transform: 'translate(-1%, 1%)' },
        },
        borderGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(220, 38, 38, 0)' },
          '50%': { boxShadow: '0 0 20px 2px rgba(220, 38, 38, 0.15)' },
        },
      },
      backgroundImage: {
        'paper-texture':
          'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [],
}
