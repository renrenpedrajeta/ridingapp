/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy()
  ],
<<<<<<< HEAD
<<<<<<< HEAD
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        dead_code: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-ionic': ['@ionic/react', '@ionic/react-router', 'ionicons'],
          'vendor-react': ['react', 'react-dom', 'react-router', 'react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
=======
=======
>>>>>>> dev
  server: {
    fs: {
      allow: ['..'],
    },
<<<<<<< HEAD
>>>>>>> dev
=======
>>>>>>> dev
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
