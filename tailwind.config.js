/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Palette actuelle (rose pale) ──
        bg: {
          primary: '#FFF0F5',
          secondary: '#FAE0EA',
          tertiary: '#F2CEDC',
        },
        // ── Ancienne palette (violet/noir) — garder en référence ──
        'bg-dark': {
          primary: '#0D0D1A',
          secondary: '#1A1A2E',
          tertiary: '#252542',
        },
        accent: {
          DEFAULT: '#7B2FBE',
          light: '#9D4EDD',
        },
        'text-sec': '#8888AA',
        badge: '#FF3366',
        online: '#44DD88',
      },
      fontFamily: {
        display: ['Quicksand', 'Nunito', 'sans-serif'],
        body: ['DM Sans', 'Outfit', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
      },
      boxShadow: {
        violet: '0 4px 24px 0 rgba(123, 47, 190, 0.18)',
        card: '0 2px 16px 0 rgba(30, 10, 60, 0.32)',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'spin-slow': 'spin 4s linear infinite',
      },
    },
  },
  plugins: [],
}

