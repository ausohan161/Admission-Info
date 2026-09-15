import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4fa",
          100: "#dbe6f3",
          200: "#b9cfe8",
          300: "#8fb0d8",
          400: "#5f8bc3",
          500: "#3e6bab",
          600: "#2d5290",
          700: "#254374",
          800: "#1f3660",
          900: "#152443",
          950: "#0d162c",
        },
      },
      fontFamily: {
        bangla: ["var(--font-bangla)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)",
        card: "0 1px 3px 0 rgb(15 23 42 / 0.06), 0 4px 12px -4px rgb(15 23 42 / 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
