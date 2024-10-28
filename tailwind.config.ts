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
        primary: {
          10: "#4c1401",
          20: "#7e2102",
          30: "#b02e02",
          40: "#e33c03",
          50: "#fc541b",
          60: "#fd7b4f",
          70: "#fda181",
          80: "#fec6b3",
          90: "#ffece6",
        },
        grey: {
          10: "#262626",
          20: "#404040",
          30: "#595959",
          40: "#737373",
          50: "#8c8c8c",
          60: "#a6a6a6",
          70: "#bfbfbf",
          80: "#d9d9d9",
          90: "#f2f2f2",
          100: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
export default config;
