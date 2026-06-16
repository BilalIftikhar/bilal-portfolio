/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#050510',
        surface: '#0A0A1A',
        surface2: '#0F0F24',
        primary: {
          DEFAULT: '#4F8EF7',
          light: '#7FB0FF',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          light: '#A06BF5',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E0C892',
        },
        success: '#10B981',
        ink: '#F8FAFC',
        muted: '#94A3B8',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Bebas Neue', 'Impact', 'sans-serif'],
        heading: ['var(--font-syne)', 'Syne', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 13s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        'mesh-1': 'mesh1 26s ease-in-out infinite',
        'mesh-2': 'mesh2 32s ease-in-out infinite',
        'mesh-3': 'mesh3 38s ease-in-out infinite',
        'spin-slow': 'spin 16s linear infinite',
        'spin-reverse': 'spin-reverse 22s linear infinite',
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
        'ai-glow': 'aiGlow 4s ease-in-out infinite',
        'grain': 'grain 0.5s steps(4) infinite',
        'dash': 'dash 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-22px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 24px rgba(79,142,247,0.22)' },
          '50%': { boxShadow: '0 0 52px rgba(79,142,247,0.5)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(50px,-40px) scale(1.1)' },
          '66%': { transform: 'translate(-40px,30px) scale(0.94)' },
        },
        mesh1: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(12%,-8%) scale(1.25)' },
        },
        mesh2: {
          '0%, 100%': { transform: 'translate(0,0) scale(1.1)' },
          '50%': { transform: 'translate(-14%,10%) scale(0.9)' },
        },
        mesh3: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(8%,12%) scale(1.2)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.6)', opacity: '0.5' },
        },
        aiGlow: {
          '0%, 100%': { textShadow: '0 0 18px rgba(16,185,129,0.7), 0 0 40px rgba(16,185,129,0.35)' },
          '50%': { textShadow: '0 0 28px rgba(79,142,247,0.8), 0 0 60px rgba(124,58,237,0.5)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '25%': { transform: 'translate(-5%,3%)' },
          '50%': { transform: 'translate(4%,-4%)' },
          '75%': { transform: 'translate(-3%,5%)' },
        },
        dash: {
          to: { strokeDashoffset: '-40' },
        },
      },
    },
  },
  plugins: [],
}
