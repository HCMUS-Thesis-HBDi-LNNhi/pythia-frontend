module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Montserrat: ["Montserrat", "sans-serif"],
      MsMadi: ["Ms Madi", "cursive"],
    },
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
      colors: {
        white: {
          DEFAULT: "#ffffff",
          100: "#F5F5F5",
        },
        primary: {
          DEFAULT: "#5880A2",
          200: "#DBE9F5",
          300: "#AFC6D9",
          400: "#83A3BE",
          500: "#5880A2",
          600: "#2C5D87",
          700: "#003A6B",
        },
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
