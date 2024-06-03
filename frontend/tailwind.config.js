/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      dancing: ['Dancing Script', 'cursive'],
    },},
    colors: {
      'css-purple': '#800080',
      'custom-black': '#000000', // Custom black
        'custom-white': '#FFFFFF', 
        'custom-gray-500': '#6B7280',
        'custom-whitesmoke':'rgba(245, 245, 245, 1)'

    },
    boxShadow: {
      'custom-hover': 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    },
  },
  plugins: [
   
  ],
}



