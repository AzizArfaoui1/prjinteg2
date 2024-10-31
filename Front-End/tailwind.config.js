/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/app/user-firstpage/user-firstpage.component.html",
    "./src/app/nav/nav.component.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}

