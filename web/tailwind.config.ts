import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "navi": "rgb(25 33 52)",
        "dash": "#F1F5F9",
        "white": "white",
        "border": "rgba(248, 250, 252, 0.06)",
        "default-font": "#c1d5f2",
        "card": "#2E3856",
      },
      textColor: {
        "primary-dark": "black",
        "primary-light": "white",
      },
      borderWidth: {
        "0.5": "0.5px",
      },
    },
  },
  plugins: [],
};
export default config;
