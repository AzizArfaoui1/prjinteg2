/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/app/user-firstpage/user-firstpage.component.html",
    "./src/app/home-header/home-header.component.html",
    "./src/app/user-dashboard/user-dashboard.component.html",
    "./src/app/user-signin/user-signin.component.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}

