/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../Backend/**/*.{js,jsx,ts,tsx}", // Include external directories if needed
    "!../Backend/node_modules",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
