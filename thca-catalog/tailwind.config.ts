import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7f3',
          100: '#dfeee4',
          200: '#c1dccb',
          300: '#97c3a7',
          400: '#6ba782',
          500: '#4b8f68',
          600: '#397454',
          700: '#2f5c45',
          800: '#284b3b',
          900: '#223d32'
        }
      }
    }
  },
  plugins: []
}

export default config