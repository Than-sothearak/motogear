/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ]
  ,
  theme: {
    extend: {
      colors: {
        //Theme 1
        // primary: 'white',
        // primarytext: "#2c3e50",
        // secondary: "#ecf0f1",
        // tertiary: "#2c3e50",
        // secondarytext: "white",

        //Theme 2

        primary: '#2c3e50',
        primarytext: "white",
        secondary: "white",
        tertiary: "#ecf0f1",
        secondarytext: "#2c3e50",
      },

    },
  },
  plugins: [],
};
