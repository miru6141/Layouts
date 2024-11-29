/** @type {import('tailwindcss').Config} */
export default {
  content: [

    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      spacing: {
        // Add custom units here
        '1cm': '56px',
        '1in': '1in',
        '10mm': '10mm',
      },

      fontFamily: {
        custom: [ 'Helvetica' ],
      },
    },
  },
  plugins: [],
}

