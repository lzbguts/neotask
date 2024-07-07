import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/theme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|calendar|checkbox|code|dropdown|input|kbd|link|listbox|modal|navbar|progress|select|skeleton|snippet|toggle|ripple|spinner|menu|divider|popover|scroll-shadow).js"
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        box: "hsl(var(--box))",
        "box-secondary": "hsl(var(--box-secondary))",
      },
    },
  },
  plugins: [nextui(), require("tailwindcss-animate")],
} satisfies Config;

export default config;
