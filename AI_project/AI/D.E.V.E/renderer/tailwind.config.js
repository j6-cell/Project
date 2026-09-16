export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deve: {
          bg: '#050814',
          surface: 'rgba(6, 18, 39, 0.72)',
          cyan: '#00ffcc',
          blue: '#1f6bff',
          violet: '#9b6dff',
          text: '#e8f7ff',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 255, 204, 0.15)',
        panel: '0 30px 80px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'scanlines': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
