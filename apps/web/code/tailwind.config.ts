import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/common-components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/email-templates/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {

      }
    },
    colors: {
      'mallow-root': '#F9EBDE',
      'dough-yellow': '#F5D0B5',
      'orange-clay': '#E7A67C',
      'mauvewood': '#B16873',
      'violet-femmes': '#A66A9D',
      'dynamic-magenta': '#8C527A',
      'plum-jam': '#6C4B82',
      'skipper-blue': '#464D79',
      'wooed': '#41406A',
      'black-howl': '#1e1d2f',
    }
  },
  plugins: [],
}
export default config
