/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "4px": "0 4px 4px 0px rgba(0, 0, 0, 0.10)",
        "4pxt": "0 -4px 4px 0px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".placeholder-center::placeholder": {
          "text-align": "center",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
