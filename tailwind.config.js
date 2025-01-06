/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontSize: {
                paragraph: '18px'
            },
            fontFamily: {
                'josefin-sans': ['Josefin\\ Sans', 'sans-serif']
            },
            screens: {
                mobile: '375px'
            }
        }
    },
    darkMode: 'class',
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['forest', 'pastel']
    }
};
