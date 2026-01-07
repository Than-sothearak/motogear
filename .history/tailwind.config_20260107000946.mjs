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
        primary: 'white',
        primarytext: "#3d3d3d",
        secondary: "#3d3d3d",
        tertiary: "#1e272e",
        secondarytext: "white",

        //Theme 2

        // primary: '#2c3e50',
        // primarytext: "white",
        // secondary: "#636e72",
        // tertiary: "#ecf0f1",
        // secondarytext: "#2c3e50",
      },

    },
  },
  plugins: [],
};
