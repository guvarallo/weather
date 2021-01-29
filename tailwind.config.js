module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        ball: "500px",
      },
    },
    height: {
      ball: "500px",
    },
    minHeight: {
      half: "50vh",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
