/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html'],
    theme: {
        extend: {
            colors: {
                'primary-100': 'hsl(192, 70%, 51%)', // Bright cyan
                'primary-200': 'hsl(136, 65%, 51%)', // Lime green
                'primary-300': 'hsl(233, 26%, 24%)', // Dark blue

                'nt-100': 'hsl(0, 0%, 100%)', // White
                'nt-200': 'hsl(0, 0%, 98%)', // Very light gray
                'nt-300': 'hsl(220, 16%, 96%)', // Light grayish blue
                'nt-400': 'hsl(233, 8%, 62%)', // Grayish blue
            },
            fontFamily: {
                'heading': ['Public Sans', 'serif'],
                'body': ['Public Sans', 'sans-serif'],
            },
            spacing: {
                'page': '70rem',
                'screen-edge': '1.5rem',
            },
            screens: {
                '2lg': '1080px',
                '3lg': '1196px',
                '2xl': '1440px',
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
