/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        'light': {
          'very-light-gray': 'hsl(0, 0%, 98%)',
          'very-light-grayish-blue': 'hsl(236, 33%, 92%)',
          'light-grayish-blue': 'hsl(233, 11%, 84%)',
          'dark-grayish-blue': 'hsl(236, 9%, 61%)',
          'very-dark-grayish-blue': 'hsl(235, 19%, 35%)'
        },
        'dark': {
          'very-dark-blue': 'hsl(235, 21%, 11%)',
          'very-dark-desaturated-blue': 'hsl(235, 24%, 19%)',
          'light-grayish-blue': 'hsl(234, 39%, 85%)',
          'light-grayish-blue-hover': 'hsl(236, 33%, 92%)',
          'dark-grayish-blue': 'hsl(234, 11%, 52%)',
          'very-dark-grayish-blue': 'hsl(233, 14%, 35%)',
          'very-dark-grayish-blue-hover': 'hsl(237, 14%, 26%)'
        },
        'bright-blue': 'hsl(220, 98%, 61%)',
        'check-bg-gradient': 'linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)'
      },
      fontSize: {
        paragraph: '18px'
      },
      fontFamily: {
        'josefin-sans': ['Josefin\\ Sans', 'sans-serif']
      },
      screens: {
        'mobile': '375px'
      },
      backgroundImage: {
        'dark': "url('/bg-dark.svg')",
        'light': "url('/bg-light.svg')"
      }
    },
  },
  darkMode: 'class',
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark", "aqua"],
  },
}