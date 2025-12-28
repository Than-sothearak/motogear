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
        primary: 'blue',
        secondary: "#ecf0f1",
        tertiary: "#2c3e50",
        primarytext: "#2c3e50",
        secondarytext: "white",
      },
  
    },
  },
  plugins: [],
};
