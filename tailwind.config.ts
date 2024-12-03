import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "border-color": "#868686",
      "letter-focused": "#737A82",
      "border-focused": "#E3E3E3",
      "button-disabled": "#34373a",
      "border-disabled": "#696969",
      "text-disabled": "#ababab",
      "default-box": "#51565B",
      "correct-box": "#3a8230",
      "wrong-place-box": "#b3bc35",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    keyframes: () => ({
      "spin-horizontally": {
        "0%": {
          transform: "rotateX(0deg)",
        },

        "100%": {
          transform: "rotateX(180deg)",
        },
      },
      "flip-horizontally": {
        "0%": {
          transform: "rotateX(0deg)",
        },

        "100%": {
          transform: "rotateX(180deg)",
        },
      },
    }),
    animation: {
      "spin-horizontally": "spin-horizontally 1s ease-in-out forwards",
      "flip-horizontally": "flip-horizontally 0 600ms forwards",
    },
  },
  plugins: [],
} satisfies Config;
