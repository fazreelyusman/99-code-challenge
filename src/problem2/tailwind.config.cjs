module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
		extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        hover: 'var(--hover)',
        border: 'var(--border)',
        text: 'var(--text)',
        placeholder: 'var(--placeholder)',
        header: 'var(--header)',
        button: 'var(--button)',
      }
    }
  },
  plugins: []
}
