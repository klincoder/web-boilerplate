/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/sections/**/*.{js,jsx}",
    "./src/styles/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ], // close content
  theme: {
    screens: {
      sm: "680px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    }, // close screens
    extend: {
      colors: {
        primary: "#313BAC",
        secondary: "#11143C",
        danger: "#FF5252",
        success: "#198754",
        error: "#DC3545",
        info: "#0DCAF0",
        warning: "#FFC107",
        white: "#FFFFFF",
        lightPrimary: "#4C57CD",
        veryLightPrimary: "#747CD8",
        lightSecondary: "#222777",
        veryLightSecondary: "#218EC4",
        lightDanger: "#FF8080",
        veryLightDanger: "#FFB3B3",
        lightSuccess: "#24C278",
        veryLightSuccess: "#68E3AA",
      }, // close colors
    }, // close extend
  }, // close theme
  plugins: [require("tw-elements/dist/plugin")], // close plugins
}; // close module
