/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    safelist: [
      "fade-in", "fade-in-delay-1", "fade-in-delay-2", "fade-in-delay-3", "fade-in-delay-4"
    ],
  theme: {
	extend: {
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
		colors: {
			background: 'hsl(var(--background) / <alpha-value>)',
			foreground: 'hsl(var(--foreground) / <alpha-value>)',
			card: {
				DEFAULT: 'hsl(var(--card) / <alpha-value>)',
				foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
				foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
				foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
				foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
				foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
				foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
				foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
			},
			border: 'hsl(var(--border) / <alpha-value>)',
			input: 'hsl(var(--input) / <alpha-value>)',
			ring: 'hsl(var(--ring) / <alpha-value>)',
			'accent-blue': 'hsl(var(--accent-blue) / <alpha-value>)',
			'accent-purple': 'hsl(var(--accent-purple) / <alpha-value>)',
			container: 'hsl(var(--container) / <alpha-value>)',
			success: 'hsl(var(--success) / <alpha-value>)',
			badge: 'hsl(var(--badge) / <alpha-value>)',
			chart: {
				'1': 'hsl(var(--chart-1) / <alpha-value>)',
				'2': 'hsl(var(--chart-2) / <alpha-value>)',
				'3': 'hsl(var(--chart-3) / <alpha-value>)',
				'4': 'hsl(var(--chart-4) / <alpha-value>)',
				'5': 'hsl(var(--chart-5) / <alpha-value>)'
			},
			sidebar: {
				DEFAULT: 'hsl(var(--sidebar-background) / <alpha-value>)',
				foreground: 'hsl(var(--sidebar-foreground) / <alpha-value>)',
				primary: 'hsl(var(--sidebar-primary) / <alpha-value>)',
				'primary-foreground': 'hsl(var(--sidebar-primary-foreground) / <alpha-value>)',
				accent: 'hsl(var(--sidebar-accent) / <alpha-value>)',
				'accent-foreground': 'hsl(var(--sidebar-accent-foreground) / <alpha-value>)',
				border: 'hsl(var(--sidebar-border) / <alpha-value>)',
				ring: 'hsl(var(--sidebar-ring) / <alpha-value>)'
			}
		},
		fontFamily: {
			heading: ['Inter', 'var(--font-heading)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			body: ['Inter', 'var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			display: ['Inter', 'var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			mono: ['var(--font-mono)']
		},
		keyframes: {
			'accordion-down': {
				from: { height: '0' },
				to: { height: 'var(--radix-accordion-content-height)' }
			},
			'accordion-up': {
				from: { height: 'var(--radix-accordion-content-height)' },
				to: { height: '0' }
			},
			'fade-in': {
				from: { opacity: '0', transform: 'translateY(20px)' },
				to: { opacity: '1', transform: 'translateY(0)' }
			},
			'float-pulse': {
				'0%, 100%': { boxShadow: '0 0 0 0 rgba(124, 58, 237, 0.4)' },
				'50%': { boxShadow: '0 0 0 12px rgba(124, 58, 237, 0)' }
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'fade-in': 'fade-in 0.6s ease-out both',
			'float-pulse': 'float-pulse 2.5s ease-in-out infinite'
		}
	}
  },
  plugins: [require("tailwindcss-animate")],
}
