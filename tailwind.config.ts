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
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          950: "#060B18",
          900: "#0A1128",
          850: "#0E1838",
          800: "#132048",
          700: "#1B2D62",
          600: "#243E88",
        },
        slate: {
          850: "#151F30",
        },
        accent: {
          blue: "#2563EB",
          emerald: "#059669",
          amber: "#D97706",
          crimson: "#DC2626",
          red: "#EF4444",
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.45)',
        'glass-button': '0 4px 20px -2px rgba(37, 99, 235, 0.35)',
        'glass-red': '0 4px 20px -2px rgba(220, 38, 38, 0.4)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
