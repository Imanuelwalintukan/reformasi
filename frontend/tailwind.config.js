module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'earthen-primary': '#B77466',
        'earthen-secondary': '#E2B59A',
        'earthen-accent': '#957C62',
        'earthen-background': '#fdfcfb',
        'earthen-highlight': '#FFE1AF',
        'earthen-text': '#4a4a4a',
      },
      fontFamily: {
        heading: ['Lora', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0,0,0,0.05)',
        'md': '0 4px 8px rgba(0,0,0,0.1)',
        'lg': '0 10px 25px rgba(0,0,0,0.1)',
        'xl': '0 20px 40px rgba(0,0,0,0.15)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}