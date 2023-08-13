/** @type {import('tailwindcss').Config} */
// const colors = require("tailwindcss/colors");
import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      english: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

