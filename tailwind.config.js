/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Glossy Black Theme Palette
        background: '#0a0a0a', // Very dark grey/black
        surface: '#121212',    // Slightly lighter for cards/panels
        primary: '#ffffff',    // White for primary text/accents
        secondary: '#a1a1aa',  // Light grey for secondary text
        accent: '#3b82f6',     // Blue accent (can be changed)
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
