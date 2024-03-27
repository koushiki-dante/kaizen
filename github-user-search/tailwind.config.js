/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html'],
    theme: {
        extend: {
            colors: {      
                'theme-100': '#EDEEF0',
                'theme-200': '#B0B4BA',
                'theme-300': '#777B84',
                'theme-400': '#696E77',
                'theme-600': '#43484E',
                'theme-700': '#363A3F',
                'theme-800': '#2E3135',
                'theme-900': '#272A2D',
                'theme-950': '#18191B',
                'theme-975': '#111113',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}

