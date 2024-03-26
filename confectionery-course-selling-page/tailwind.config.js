/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        base: ["Raleway", "sans-serif"],
      },
      textColor: {
        accent: "#a80b0b",
        secondary: "#900909",
        tertiary: "#f5f0f0",
      },
      backgroundColor: {
        100: "#f5f0f0",
        200: "#f2ebeb",
        300: "#f22e2e",
        400: "#900909",
      },
      maxWidth: {
        page: "1280px",
      },
      margin: {
        "screen-edge": "2rem",
      },
      padding: {
        "screen-edge": "2rem",
      },
      gridTemplateColumns: {
        nav: "1fr max-content max-content",
        theme: "1fr 528px 1fr",
        thememd: "1fr 656px 1fr",
        themelg: "0.0625fr 1fr 1fr 0.0625fr",
        themexl: "0.15fr 1fr 1fr 0.15fr",
      },
      screens: {
        xs: "480px",
        "2lg": "1104px",
        "3lg": "1184px",
        "4lg": "1248px",
      },
    },
  },
  plugins: [],
};
