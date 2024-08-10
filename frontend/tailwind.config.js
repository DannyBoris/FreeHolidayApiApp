/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors
      colors: {
        primary: {
          100: "#f0f9ff",
          200: "#e0f2fe",
          300: "#bae6fd",
          400: "#7dd3fc",
          500: "#38bdf8",
          600: "#0ea5e9",
          700: "#0284c7",
          800: "#0369a1",
          900: "#075985",
        },
        secondary: {
          100: "#f8f8f8",
          200: "#f1f1f1",
          300: "#e3e3e3",
          400: "#c9c9c9",
          500: "#a8a8a8",
          600: "#7d7d7d",
          700: "#4c4c4c",
          800: "#2d2d2d",
          900: "#1a1a1a",
        },
        tertiary: {
          100: "#f9f8f8",
          200: "#f3f1f1",
          300: "#e6e3e3",
          400: "#ccc9c9",
          500: "#aaa8a8",
          600: "#7f7d7d",
          700: "#4f4c4c",
          800: "#2f2d2d",
          900: "#1c1a1a",
        },
      },
    },
  },
  plugins: [],
};
