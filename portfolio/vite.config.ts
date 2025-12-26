import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

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

    // Enable source maps for debugging (hidden in production)
    sourcemap: false,

    // Minification (Vite 7 uses Oxc minifier by default - 30-90x faster)
    minify: 'esbuild',

    // CSS code splitting
    cssCodeSplit: true,

    // Asset size warning limit (500KB)
    chunkSizeWarningLimit: 500,

    // Rolldown options for Vite 7
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk for React
          'vendor-react': ['react', 'react-dom'],
          // Rive animation library in separate chunk
          'vendor-rive': ['@rive-app/react-canvas'],
        },
        // Asset file naming with content hash for cache busting
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          // Keep .riv files in assets/rive directory
          if (name.endsWith('.riv')) {
            return 'assets/rive/[name]-[hash][extname]';
          }
          // Fonts in fonts directory
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          // Images in images directory
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          // Default for other assets
          return 'assets/[name]-[hash][extname]';
        },
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        // Entry file naming
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
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@rive-app/react-canvas'],
  },
})
