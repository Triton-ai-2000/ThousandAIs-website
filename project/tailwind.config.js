/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float-reverse 10s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'flash': 'flash 0.7s ease-in-out',
      },
      backgroundImage: {
        'magic-gradient': 'linear-gradient(to right, #4f46e5, #7e22ce, #ec4899)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 15px 5px rgba(167, 139, 250, 0.3)',
      },
    },
  },
  plugins: [],
  safelist: [
    'opacity-100',
    'scale-110',
    'opacity-80',
  ],
};