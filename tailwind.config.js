/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // deep dark background
        foreground: '#fafafa',
        primary: {
          DEFAULT: '#9333ea', // purple
          foreground: '#ffffff',
        },
        card: {
          DEFAULT: 'rgba(255,255,255,0.05)',
          border: 'rgba(255,255,255,0.1)',
        }
      }
    },
  },
  plugins: [],
}
