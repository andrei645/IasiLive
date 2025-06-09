/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#1A1A1D",
        surface: "#3B1C32",
        primary: "#6A1E55",
        primaryLight: "#A64D79",
        accent: "#A64D79",
        textMain: "#F5F5F5",
        border: "#2A2A2D",
        error: "#f44336",
        success: "#4caf50",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
