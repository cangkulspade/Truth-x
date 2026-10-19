/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090b10',
        'panel-bg': '#0d1117',
        'panel-border': '#1a2233',
        'border-subtle': '#1e2a3a',
        cyber: {
          cyan: '#00f2fe',
          'cyan-dim': '#0ea5e9',
          red: '#ff2a5f',
          green: '#10ffa3',
          amber: '#ffb830',
          purple: '#a855f7',
        },
        ink: {
          primary: '#e2e8f0',
          secondary: '#94a3b8',
          muted: '#475569',
        },
        status: {
          honest: '#10ffa3',
          doubtful: '#ffb830',
          deceptive: '#ff2a5f',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}

