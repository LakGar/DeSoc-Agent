/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      fontSize: {
        "2xs": "0.625rem",
        title: [
          "3.5rem",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        wide: "0.025em",
        wider: "0.05em",
      },
      lineHeight: {
        tighter: "1.1",
      },
      boxShadow: {
        glow: "0 0 25px rgba(80, 100, 255, 0.2), 0 0 10px rgba(80, 100, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
