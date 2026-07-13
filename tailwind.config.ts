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
        background: "#060B24",
        foreground: "#FFFFFF",
        cyber: {
          black: "#000000",
          space: "#060B24",
          dark: "#0F172A",
          blue: "#3B82F6",
          cyan: "#00F5FF",
          purple: "#8B5CF6",
          green: "#7CFFCB",
        },
      },
      fontFamily: {
        space: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        sora: ["var(--font-sora)", "Sora", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-reverse": "spin-reverse 25s linear infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "glitch": "glitch 1s linear infinite",
        "grid-move": "grid-move 20s linear infinite",
        "neon-glow": "neon-glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "spin-reverse": {
          to: {
            transform: "rotate(-360deg)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "grid-move": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(40px)" },
        },
        "neon-glow": {
          "0%": { boxShadow: "0 0 5px rgba(0, 245, 255, 0.2), 0 0 10px rgba(0, 245, 255, 0.2)" },
          "100%": { boxShadow: "0 0 15px rgba(0, 245, 255, 0.6), 0 0 30px rgba(139, 92, 246, 0.6)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
