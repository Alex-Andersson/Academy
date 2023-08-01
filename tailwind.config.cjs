/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  theme: {
    // colors: {
    //   'primary-green': '#82c341',
    //   // Configure your color palette here
    // },
    extend: {
      colors: {
        'custom-purple': '#1C1241',
        'purple': '#6136FF',
    },
  },
  },
  plugins: [require("@tailwindcss/forms")],
  safelist: [
    {
      pattern:
        /(bg|text|border)-s2cond(Purple|Pink|Orange|Yellow|Lime|Mint|Test|Test2)/,
    },
  ],
};
