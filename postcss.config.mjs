// postcss.config.mjs
const config = {
  plugins: {
    'tailwindcss/nesting': {}, // Optional but recommended
    'tailwindcss': {},
    'autoprefixer': {},
  },
};

export default config;