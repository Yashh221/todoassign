import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        primary: "#EFEFEF",
        secondary: "#FFFFFF",
        gray: "#F2F2F2",
        red: "#FF4C4C",
        green: "#0B8A00",
      },
      boxShadow: {
        primary: "4px 4px 10px 10px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
