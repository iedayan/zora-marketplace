const { violet, fuchsia, emerald } = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: violet,
        secondary: fuchsia,
        accent: emerald,
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'particle-float': 'particle-float 12s ease-in-out infinite',
        'blob': 'blob 7s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'bounce': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        'particle-float': {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) scale(1)',
            opacity: '0.3',
          },
          '50%': { 
            transform: 'translateY(-40px) translateX(20px) scale(1.2)',
            opacity: '0.8',
          },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px 5px rgba(110, 231, 183, 0.3)' }, // Using accent color (emerald)
          '50%': { boxShadow: '0 0 35px 10px rgba(110, 231, 183, 0.5)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        }
      },
    },
  },
  plugins: [],
};