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
        "discord-main": "#7289da",
        "discord-gray-100": "#40444B",
        "discord-gray-200": "#36393F",
        "discord-gray-300": "#2f3136",
        "discord-gray-400": "#202225",
        "discord-gray-500": "#18191C",
      },
    },
  },
  plugins: [],
};
export default config;
