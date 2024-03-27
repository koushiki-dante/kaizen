/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            // SHADCN UI
            center: true,
            padding: "2rem",
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            // CHALLENGE DESIGN SYSTEM
            fontFamily: {
                'sans': ['Kumbh Sans', 'serif'],
            }, 

            screens: {
                '2lg': '1118px',
                '3lg': '1196px',
                'xs': '480px',
            },

            colors: {
                // CHALLENGE DESIGN SYSTEM
                'primary-100': 'hsl(25, 100%, 94%)', // Pale orange
                'primary-200': 'hsl(26, 100%, 55%)', // Orange

                'nt-100': 'hsl(0, 0%, 100%)', // White
                'nt-200': 'hsl(223, 64%, 98%)', // Light grayish blue
                'nt-300': 'hsl(220, 14%, 75%)', // Grayish blue
                'nt-400': 'hsl(219, 9%, 45%)', // Dark grayish blue
                'nt-500': 'hsl(220, 13%, 13%)', // Very dark blue
                'nt-600': 'hsl(0, 0%, 0%)', // Black

                // SHADCN UI
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
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
}
