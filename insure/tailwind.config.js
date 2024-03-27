/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html'],
    theme: {
        extend: {
            margin: {
                'screen-edge': '2rem',
            },
            padding: {
                'screen-edge': '2rem',
            },
            colors: {
                'primary-100': 'hsl(216, 30%, 68%)', // Grayish blue 
                'primary-200': 'hsl(256, 26%, 20%)', // Dark violet

                'neutral-100': 'hsl(0, 0%, 98%)', // Very light gray
                'neutral-200': 'hsl(273, 4%, 51%)', // Dark grayish violet
                'neutral-300': 'hsl(270, 9%, 17%)', // Very dark violet
            },
            fontFamily: {
                'heading': ['DM Serif Display', 'serif'],
                'body': ['Karla', 'sans-serif'],
            },
            screens: {
                'xs': '528px',
                '2lg': '1080px',
                '3lg': '1144px',
            },
            gridTemplateColumns: {
                'hero': '2rem 1fr 1fr 2rem',
                '2hero': 'auto 540px 540px auto',
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
