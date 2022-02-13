module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
        "sans": ["Inter"],
        "display": ["Syne"],
        "body": ["Inter"]
    }
  },
  plugins: [
      require("@tailwindcss/forms"),
      require("@tailwindcss/typography"),
      require("autoprefixer")
  ],
};
