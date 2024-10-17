/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var--background)",
        primary: "hsl(var--primary)",
        secondary: "hsl(var--secondary)",
        muted: "hsl(var--muted)",
        accent: "hsl(var--accent)",
        text: "hsl(var--text)",
        title: "hsl(var--title)",
      },
    },
  },
  plugins: [],
};
