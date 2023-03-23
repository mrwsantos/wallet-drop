/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(lime|red|yellow)-(200)/,
    },
    {
      pattern: /text-(lime|red|yellow)-(500|700)/,
    },
    {
      pattern: /border-(lime|red|yellow)-(500|700)/,
    },
  ],
  darkMode: "class",
  theme: {
    extend: {
      // backgroundImage:{
      //   'autentication-back': "url(https://source.unsplash.com/random?finances)"
      // }
    },
  },
  important: true,
  plugins: [],
};
