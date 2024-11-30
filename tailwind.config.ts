import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "letter-box": "#51565B",
      "border-color": "#868686",
      "letter-focused": "#737A82",
      "border-focused": "#E3E3E3",
      "button-disabled": "#34373a",
      "border-disabled": "#696969",
      "text-disabled": "#ababab",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
