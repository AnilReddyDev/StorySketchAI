/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/assets/red-bg-comic.avif')",
        "hero1-pattern": "url('/src/assets/red-cloud-bg-comic.avif')",
        "hero2-pattern": "url('/src/assets/comic3.avif')",
      },
    },
  },
  plugins: [],
};
