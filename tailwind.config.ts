import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.25rem", /* 20px margins */
      screens: {
        sm: "375px", /* Mobile-first */
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        /* BalanceIQ Typography Scale */
        'h1': ['1.75rem', { lineHeight: '2.125rem', letterSpacing: '-0.5px', fontWeight: '700' }], /* 28pt */
        'h2': ['1.25rem', { lineHeight: '1.625rem', letterSpacing: '-0.3px', fontWeight: '600' }], /* 20pt */
        'body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }], /* 16pt */
        'body-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }], /* 14pt */
        'caption': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }], /* 12pt */
        'tab': ['0.6875rem', { lineHeight: '1rem', fontWeight: '500' }], /* 11pt */
        'number-lg': ['2rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.02em' }], /* 32pt */
        'number-md': ['1.25rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.02em' }], /* 20pt */
      },
      spacing: {
        /* 8pt grid system */
        '0.5': '0.125rem', /* 2px */
        '1': '0.25rem', /* 4px */
        '2': '0.5rem', /* 8px */
        '3': '0.75rem', /* 12px */
        '4': '1rem', /* 16px */
        '5': '1.25rem', /* 20px */
        '6': '1.5rem', /* 24px */
        '7': '1.75rem', /* 28px */
        '8': '2rem', /* 32px */
        '10': '2.5rem', /* 40px */
        '11': '2.75rem', /* 44px - min tap target */
        '14': '3.5rem', /* 56px - button height */
        '17': '4.25rem', /* 68px - header height */
        '18': '4.5rem', /* 72px - bill card height */
        '20': '5rem', /* 80px - tab bar height */
        'safe-top': '2.75rem', /* 44px status bar */
        'safe-bottom': '2.125rem', /* 34px home indicator */
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
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
        caption: "hsl(var(--caption))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "var(--radius-lg)",
        "2xl": "var(--radius-xl)",
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-pressed': 'var(--shadow-card-pressed)',
        'modal': 'var(--shadow-modal)',
        'tab': 'var(--shadow-tab)',
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
