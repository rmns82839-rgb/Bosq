/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5eef9',
          100: '#ebddf3',
          200: '#d7bbe7',
          300: '#c39adb',
          400: '#af78cf',
          500: '#8e44ad',
          600: '#7a3b94',
          700: '#66327c',
          800: '#522a63',
          900: '#3e214a',
        }
      },
      fontFamily: {
        'serif': ['Lora', 'serif'],
        'cursive': ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}
