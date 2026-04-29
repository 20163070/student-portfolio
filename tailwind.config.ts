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
        ink: "#17211d",
        moss: "#6f7f55",
        cream: "#f7f1e5",
        clay: "#bd6547",
        paper: "#fffaf1",
      },
      boxShadow: {
        soft: "0 24px 80px rgba(23, 33, 29, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
