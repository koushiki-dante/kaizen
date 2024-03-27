/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html'],
    theme: {
        extend: {
            colors: {
                'theme-950': '#111113',
                'theme-925': '#18191B',
                'theme-900': '#212225',
                'theme-800': '#272A2D',
                'theme-700': '#2E3135',
                'theme-600': '#363A3F',
                'theme-500': '#43484E',
                'theme-400': '#5A6169',
                'theme-300': '#696E77',
                'theme-200': '#777B84',
                'theme-100': '#B0B4BA',
                'theme-50': '#EDEEF0',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
