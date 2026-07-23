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
        primary: '#f97316', // Orange-500 for a food-app feel
        secondary: '#1e293b',
      }
    },
  },
  plugins: [],
}
