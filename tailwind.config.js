/** @type {import('tailwindcss').Config} */

// Import resources
const defaultTheme = require("tailwindcss/defaultTheme");

// MODULE EXPORTS
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ], // close content
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    }, // close screens
    extend: {
      colors: {
        primary: "#313bac",
        secondary: "#11143c",
        accent: "#f9f871",
        success: "#198754",
        danger: "#ff5252",
        info: "#0dcaf0",
        warning: "#ffc107",
        error: "#dc3545",
        white: "#ffffff",
        lightPrimary: "#6069d2", //"#4c57cd",
        veryLightPrimary: "#afb4e9", //"#747cd8",
        lightSecondary: "#1c2163", //"#222777",
        veryLightSecondary: "#272e8b", //"#218ec4",
        lightDanger: "#ff8080",
        veryLightDanger: "#ffb3b3",
        lightSuccess: "#24c278",
        veryLightSuccess: "#68e3aa",
      }, // close colors
      fontFamily: {
        montserrat: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
      }, // close font family
    }, // close extend
  }, // close theme
  plugins: [require("tw-elements/dist/plugin")], // close plugins
}; // close module
