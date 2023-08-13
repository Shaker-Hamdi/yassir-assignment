/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

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
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        green: colors.green,
        orange: colors.orange,
        red: colors.red,
        blue: colors.blue,
        pink: colors.pink,
        teal: colors.teal,
        cyan: colors.cyan,
        lime: colors.lime,
        rose: colors.rose,
        amber: colors.amber,
        fuchsia: colors.fuchsia,
        violet: colors.violet,
        purple: colors.purple,
        lightBlue: colors.lightBlue,
        darkBlue: colors.blueGray,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

