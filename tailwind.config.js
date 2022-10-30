/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#06283D",
        secondary: "#256D85",
        accent: "#47B5FF",
        additional: "#DFF6FF",
        right:"#FF884B",
        completed:"#A8E890",
        empty:"#B2B2B2"
      },
    },
  },
  plugins: [],
};
