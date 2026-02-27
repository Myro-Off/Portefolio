import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        "3xl": "1.5rem",
      },
      colors: {
        background: "#050505",
      }
    },
  },
  plugins: [
    typography,
  ],
};

export default config;