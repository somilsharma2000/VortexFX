/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fortrex: { bg: "#0A0E27", card: "#0A0A0A", gold: "#D4AF37", green: "#00C853" },
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
