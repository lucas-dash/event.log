import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#ed4b3a",
        "primary-content": "#ffffff",
        "primary-dark": "#e02814",
        "primary-light": "#f17669",

        secondary: "#1A1A1A",
        "secondary-content": "#E0E0E0",
        "secondary-dark": "#030303",
        "secondary-light": "#333333",

        background: "#f0efef",
        "background-dark": "#1b1818",
        foreground: "#fbfbfb",
        "foreground-dark": "#282524",
        border: "#e1dede",
        "border-dark": "#433d3d",

        copy: "#282524",
        "copy-dark": "#fbfbfb",
        "copy-light": "#6b6261",
        "copy-light-dark": "#dbd7d7",
        "copy-lighter": "#928887",
        "copy-lighter-dark": "#aaa2a1",

        badge: "#ffffff",
        "badge-dark": "#171717",

        success: "#73F273",
        "success-dark": "#A2F6A2",
        "success-content": "#032503",
        warning: "#EDED3B",
        "warning-content": "#252503",
        error: "#ED3B3B",
        "error-content": "#ffffff",
      },
      boxShadow: {
        base: "0 7px 29px 0 rgba(100, 100, 111, 0.2)",
        "base-dark": "0 10px 15px -3px rgba(99, 99, 110, 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
