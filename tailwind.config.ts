import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        navy: "#111827",
        cloud: "#f5f7fb",
        violet: "#7c3aed",
        cobalt: "#2563eb",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.10)",
        glow: "0 24px 80px rgba(37, 99, 235, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
