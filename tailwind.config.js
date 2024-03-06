/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['JetBrains Mono', 'monospace']
      }
    }
  },
  daisyui: {
    themes: ['dark', 'nord']
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')]
}
