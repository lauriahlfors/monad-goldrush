import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      akvamariini: {
        50: '#E3FDF4',
        100: '#C7FAE9',
        200: '#8EF5D3',
        300: '#56F0BD',
        400: '#1EECA7',
        500: '#10B981',
        600: '#0D9668',
        700: '#0A714E',
        800: '#064B34',
        900: '#03261A',
        950: '#03110C',
      },
    },
  },
  plugins: [],
};
export default config;
