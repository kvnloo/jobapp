/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Factory.ai color palette
        'dark-base-primary': '#020202',
        'dark-base-secondary': '#101010',
        'light-base-primary': '#eeeeee',
        'light-base-secondary': '#fafafa',

        // Accent colors
        'accent-100': '#ef6f2e',
        'accent-200': '#ee6018',
        'accent-300': '#d15010',

        // Neutral palette
        'neutral-100': '#d6d3d2',
        'neutral-200': '#ccc9c7',
        'neutral-300': '#b8b3b0',
        'neutral-400': '#a49d9a',
        'neutral-500': '#8a8380',
        'neutral-600': '#5c5855',
        'neutral-700': '#4d4947',
        'neutral-800': '#3d3a39',
        'neutral-900': '#2e2c2b',
        'neutral-1000': '#1f1d1c',

        // Base colors (mapped to neutral)
        'base-100': '#d6d3d2',
        'base-200': '#ccc9c7',
        'base-300': '#b8b3b0',
        'base-400': '#a49d9a',
        'base-500': '#8a8380',
        'base-600': '#5c5855',
        'base-700': '#4d4947',
        'base-800': '#3d3a39',
        'base-900': '#2e2c2b',
        'base-1000': '#1f1d1c',

        // Semantic colors
        'background': '#020202',
        'foreground': '#eeeeee',
      },
      fontFamily: {
        sans: ['Geist', '"Geist Fallback"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"Geist Mono Fallback"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.25rem',    // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
        '7xl': '4.5rem',    // 72px
      },
      borderRadius: {
        'xs': '0.125rem',   // 2px
        'sm': '0.25rem',    // 4px
        'md': '0.375rem',   // 6px
        'lg': '0.5rem',     // 8px
        'xl': '0.75rem',    // 12px
        '2xl': '1rem',      // 16px
        '3xl': '1.5rem',    // 24px
      },
      spacing: {
        'spacing': '0.25rem', // 4px base spacing unit
      },
      letterSpacing: {
        'tight-xs': '-0.015rem',
        'tight-sm': '-0.0175rem',
        'tight-base': '-0.02rem',
        'tight-lg': '-0.0225rem',
        'tight-xl': '-0.05625rem',
        'tight-2xl': '-0.09rem',
        'tight-3xl': '-0.16rem',
        'tight-4xl': '-0.18rem',
      },
      lineHeight: {
        'tight': '1.25',
        'snug': '1.375',
        'relaxed': '1.625',
        'loose': '2',
      },
    },
  },
  plugins: [],
}
