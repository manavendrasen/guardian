/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F67248',
        'action': '#16A34A',
        'bg': '#333333',
        'sec-bg': '#45474D',
        'subtext': '#8C8E9D',
        'white': '#FAFAFA',
        "surface": "#D8D8D8"
      },
    },
  },
  plugins: [],
}