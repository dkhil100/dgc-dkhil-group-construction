/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode switching via the 'dark' class on <html>
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
      },
    },
  },
  plugins: [
    // Custom plugin to hide scrollbars while keeping touch/drag functionality
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "-ms-overflow-style": "none", /* IE and Edge */
          "scrollbar-width": "none", /* Firefox */
          "&::-webkit-scrollbar": {
            display: "none", /* Chrome, Safari, and Opera */
          },
        },
      });
    },
  ],
};