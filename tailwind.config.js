/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdfcfb',
          100: '#f8f5f2',
          200: '#f0ece6',
          300: '#e5ddd3',
          400: '#d5c9ba',
          500: '#a3907c',
          600: '#8c7763',
          700: '#756050',
          800: '#5f4d41',
          900: '#4e4036',
        },
        accent: {
          primary: '#2563eb', // Blue
          secondary: '#7c3aed', // Violet
          success: '#10b981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}