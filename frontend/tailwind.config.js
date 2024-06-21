/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                back: '#06120b',
                dark: '#000d1c',
                primary: '#ff7800',
                secondary: '#0058fe',
                info: '#64c9dd',
                success: '#63ba00',
                warning: '#ffc77b',
                danger: '#fc0067',
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.bg-white': {
                    color: '#000d1c',
                },
            };

            addUtilities(newUtilities, ['responsive', 'hover']);
        },
    ],
};
