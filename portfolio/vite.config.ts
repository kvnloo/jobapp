import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base path for deployment (use '/' for root, or '/subpath/' for subpath deployments)
  base: '/',

  // Path resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Asset handling configuration
  assetsInclude: ['**/*.riv'],

  // Build optimization for production
  build: {
    // Target modern browsers for smaller bundle
    target: 'esnext',

    // Output directory
    outDir: 'dist',

    // Disable source maps in production for smaller bundle and security
    sourcemap: false,

    // Minification using esbuild (fast and efficient)
    minify: 'esbuild',

    // CSS code splitting for better caching
    cssCodeSplit: true,

    // Inline assets smaller than 4KB as base64
    assetsInlineLimit: 4096,

    // Asset size warning limit (500KB)
    chunkSizeWarningLimit: 500,

    // Module preload for better loading performance
    modulePreload: {
      polyfill: true,
    },

    // Rollup options for chunk splitting and asset organization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-rive': ['@rive-app/react-canvas'],
        },
        // Asset file naming with content hash for cache busting
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || ''
          if (name.endsWith('.riv')) {
            return 'assets/rive/[name]-[hash][extname]'
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(name)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) {
            return 'assets/images/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },

  // Development server configuration
  server: {
    port: 5173,
    strictPort: false,
    host: true,
  },

  // Preview server (production build preview)
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    headers: {
      // Security headers for production preview
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },

  // Optimize dependencies for faster dev server startup
  optimizeDeps: {
    include: ['react', 'react-dom', '@rive-app/react-canvas'],
  },
})
