/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // ✅ Add paths where Tailwind is used
    ],
    darkMode: 'class', // ✅ Enables dark mode using class strategy
    theme: {
      extend: {},
    },
    plugins: [],
  };
  