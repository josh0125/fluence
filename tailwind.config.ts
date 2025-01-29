import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"], // Enables dark mode based on a class
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "./content/**/*.{ts,tsx,md,mdx}", // Added support for markdown files if needed
    ],
    prefix: "", // Default prefix
    theme: {
        container: {
            center: true, // Centers the container
            padding: "2rem", // Adds padding
            screens: {
                "2xl": "1400px", // Customizes container width for 2xl screens
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
            typography: ({ theme }: { theme: (path: string) => string }) => ({
                DEFAULT: {
                    css: {
                        color: theme("colors.foreground"),
                        a: {
                            color: theme("colors.primary.DEFAULT"),
                            textDecoration: "none",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        },
                        h1: {
                            fontWeight: "700",
                            color: theme("colors.foreground"),
                        },
                        h2: {
                            fontWeight: "600",
                            color: theme("colors.foreground"),
                        },
                        blockquote: {
                            fontStyle: "italic",
                            color: theme("colors.muted.foreground"),
                        },
                        code: {
                            backgroundColor: theme("colors.muted.DEFAULT"),
                            padding: "0.2rem 0.4rem",
                            borderRadius: theme("borderRadius.sm"),
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require("tailwindcss-animate"), // Animation plugin
        require("@tailwindcss/typography"), // Adds support for markdown styling
    ],
} satisfies Config;
