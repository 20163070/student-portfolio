import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        moss: "#6f7f55",
        cream: "rgb(var(--cream) / <alpha-value>)",
        clay: "rgb(var(--clay) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 8px 28px rgba(75, 48, 29, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
