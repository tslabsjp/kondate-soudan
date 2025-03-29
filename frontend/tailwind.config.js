// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // JSXの中でもTailwindを補完できるように！
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
