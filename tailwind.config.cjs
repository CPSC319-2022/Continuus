/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Work Sans"],
    },
    extend: {
      colors: {
        "highlight-green": "#31efb8",
      },
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')],
};
