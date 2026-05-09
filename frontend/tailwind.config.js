/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          DEFAULT: "#ec5c53",
          dark: "#e0523e",
          deeper: "#c1402d",
          ink: "#2A1614",
          cream: "#FDFBF7",
          surface: "#F5F2EA",
          muted: "#755D5A",
          line: "#E8DFD8",
        },
        primary: {
          DEFAULT: "#ec5c53",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F5F2EA",
          foreground: "#2A1614",
        },
        muted: {
          DEFAULT: "#F5F2EA",
          foreground: "#755D5A",
        },
        accent: {
          DEFAULT: "#FDE7E3",
          foreground: "#c1402d",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#2A1614",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#2A1614",
        },
      },
      fontFamily: {
        display: ["'Cabinet Grotesk'", "'Fraunces'", "Georgia", "serif"],
        sans: ["'Work Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
