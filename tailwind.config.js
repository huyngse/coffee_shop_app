/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryRed: "#DC3535",
        primaryOrange: "#D17842",
        primaryBlack: "#0C0F14",
        primaryDarkGray: "#141921",
        secondaryDarkGray: "#21262E",
        primaryGray: "#252A32",
        secondaryGray: "#252A32",
        primaryLightGray: "#52555A",
        secondaryLightGray: "#AEAEAE",
        primaryBlackT: "rgba(12,15,20,0.5)",
        secondaryBlackT: "rgba(0,0,0,0.7)",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
