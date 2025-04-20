import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // UC Davis inspired colors
        blue: {
          100: "#E6F3FF",
          200: "#B3DBFF",
          300: "#80C3FF",
          400: "#4DABFF",
          500: "#1A93FF", // Primary blue
          600: "#0077E6",
          700: "#005BB3",
          800: "#003F80",
          900: "#00234D",
        },
        green: {
          100: "#E6F7E6",
          200: "#C2EAC2",
          300: "#9FDD9F",
          400: "#7BD07B",
          500: "#58C358", // Primary green
          600: "#3EA63E",
          700: "#2E7D2E",
          800: "#1F531F",
          900: "#0F2A0F",
        },
        yellow: {
          100: "#FFF8E6",
          200: "#FFEDB3",
          300: "#FFE180",
          400: "#FFD64D",
          500: "#FFCC1A", // Primary yellow
          600: "#E6B300",
          700: "#B38A00",
          800: "#806200",
          900: "#4D3A00",
        },
        orange: {
          100: "#FFF0E6",
          200: "#FFD6B3",
          300: "#FFBC80",
          400: "#FFA24D",
          500: "#FF881A", // Primary orange
          600: "#E66E00",
          700: "#B35500",
          800: "#803C00",
          900: "#4D2300",
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
