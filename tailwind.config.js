/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A1F33',
        teal: '#0F766E',
        cta: '#C2410C',
        surface: '#F4F7F9',
        line: '#DDE3EA',
        body: '#3E5163',
      },
      fontFamily: { sans: ['Montserrat', 'sans-serif'] },
      boxShadow: {
        soft: '0 12px 35px rgba(10,31,51,.08)',
        lift: '0 22px 55px rgba(10,31,51,.14)',
      },
    },
  },
  plugins: [],
}
