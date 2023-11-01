/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      mplus: ["Mplus"],
      sans: ["Roboto"],
    },
    extend: {
      opacity: {
        0: "0",
      },
    },
  },
  plugins: [],
};
