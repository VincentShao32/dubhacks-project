/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "black" : "000000",
        "red": "#FF5154",
        "light-red": "#FFA9A3",
        "yellow": "#FFE261",
        "light-blue": "#65EAE3",
        "light-green": "#8FFFAF",
      },
    },
  },
  plugins: [],
};
