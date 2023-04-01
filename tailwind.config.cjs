/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Atkinson Hyperlegible"],
    },
    extend: {
      colors: {
        "highlight-green": "#31efb8",
        "highlight-red": "#e65244",
      },
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')],
  daisyui: {themes: [
    {
    light: {
      ...require('daisyui/src/colors/themes')['[data-theme=light]'],
      "info": "#9CA3AF"
    },
  }
  ]}
};
