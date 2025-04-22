/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#1e293b',   // Blu notte
        accent: '#38bdf8',    // Blu acqua
        light: '#f1f5f9',     // Grigio chiarissimo
      },
    },
  },
  plugins: [],
}
