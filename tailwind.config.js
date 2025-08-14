/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "*.{js,ts,jsx,tsx,mdx}",
    ],
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
                // Custom ARG theme colors (using hex values for direct application)
                "ff-dark-blue": "#23424c",
                "ff-mid-blue": "#8AAFB2",
                "ff-light-blue": "#B3C8CF",
                "ff-beige": "#E5E1DA",
                "ff-cream": "#F1F0E8",
                "slate-950": "#020617",
                "slate-900": "#0F172A",
                "slate-800": "#1E293B",
                "slate-700": "#334155",
                "slate-600": "#475569",
                "slate-500": "#64748B",
                "slate-400": "#94A3B8",
                "slate-300": "#CBD5E1",
                "green-400": "#4ADE80",
                "green-500": "#22C55E",
                "green-600": "#16A34A",
                "green-700": "#15803D",
                "blue-400": "#60A5FA",
                "purple-400": "#C084FC",
                "yellow-400": "#FACC15",
                "red-400": "#F87171",
                "red-500": "#EF4444",
                "red-600": "#DC2626",
                "red-700": "#B91C1C",
                "red-950": "#450A0A",

                // Shadcn/ui default colors (referencing CSS variables defined in globals.css)
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
            fontFamily: {
                'sarala-regular': ['var(--font-sarala-regular)'],
                'sarala-bold': ['var(--font-sarala-bold)'],
                'geist-sans': ['var(--font-geist-sans)'],
                'geist-mono': ['var(--font-geist-mono)'],
            }
        },
    },
    plugins: [require("tailwindcss-animate")],
}
