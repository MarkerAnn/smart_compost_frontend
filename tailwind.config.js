/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-indigo': '#4A32D8',
        'royal-blue': '#441BB1',
        'midnight-blue': '#440F7D',
        violet: '#6C177F',
        magenta: '#94208D',
        'soft-purple': '#A890D3',
        'light-purple': '#C7B9E2',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(to right, #4A32D8, #440F7D, #94208D)',
        'royal-gradient': 'linear-gradient(to right, #441BB1, #6C177F)',
        'indigo-magenta-gradient':
          'linear-gradient(to bottom, #4A32D8, #94208D)',
        'violet-blue-gradient': 'linear-gradient(to right, #6C177F, #441BB1)',
      },
      fontFamily: {
        'cormorant-garamond': ['Cormorant Garamond', 'serif'],
        'cormorant-sc': ['Cormorant SC', 'serif'],
        'cormorant-unicase': ['Cormorant Unicase', 'serif'],
        'goblin-one': ['Goblin One', 'sans-serif'],
        'playfair-display': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
