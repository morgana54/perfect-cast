import type { Config } from "tailwindcss";

export default {
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "speaking-wave-1": {
          "0%, 100%": { height: "8px" },
          "50%": { height: "16px" },
        },
        "speaking-wave-2": {
          "0%, 100%": { height: "12px" },
          "50%": { height: "24px" },
        },
        "speaking-wave-3": {
          "0%, 100%": { height: "16px" },
          "50%": { height: "20px" },
        },
        "speaking-wave-4": {
          "0%, 100%": { height: "24px" },
          "50%": { height: "16px" },
        },
        "speaking-wave-5": {
          "0%, 100%": { height: "16px" },
          "50%": { height: "20px" },
        },
        "speaking-wave-6": {
          "0%, 100%": { height: "12px" },
          "50%": { height: "24px" },
        },
        "speaking-wave-7": {
          "0%, 100%": { height: "8px" },
          "50%": { height: "16px" },
        },
      },
      animation: {
        "speaking-wave-1": "speaking-wave-1 1.2s ease-in-out infinite",
        "speaking-wave-2": "speaking-wave-2 1.1s ease-in-out infinite",
        "speaking-wave-3": "speaking-wave-3 1s ease-in-out infinite",
        "speaking-wave-4": "speaking-wave-4 0.9s ease-in-out infinite",
        "speaking-wave-5": "speaking-wave-5 1s ease-in-out infinite",
        "speaking-wave-6": "speaking-wave-6 1.1s ease-in-out infinite",
        "speaking-wave-7": "speaking-wave-7 1.2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
