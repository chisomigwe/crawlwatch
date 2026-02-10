import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");

// Import theme colors for Tailwind
// Note: These are also available as CSS variables via the ThemeProvider
const themeColors = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
    DEFAULT: "#2563eb",
  },
  secondary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
    DEFAULT: "#4f46e5",
  },
};

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Theme colors available as Tailwind classes
        // e.g., bg-primary-500, text-secondary-600
        primary: themeColors.primary,
        secondary: themeColors.secondary,
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Arial", "Helvetica", "sans-serif"],
        bebas: ["var(--font-bebas)", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#374151",
            h1: { fontFamily: "var(--font-bebas)" },
            h2: { fontFamily: "var(--font-bebas)" },
            h3: { fontFamily: "var(--font-bebas)" },
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography"), heroui()],
} satisfies Config;
