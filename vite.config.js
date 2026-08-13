import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    // UI tests use global DOM and module mocks. Running every file at once made
    // slower CI machines time out and cascade state into later assertions.
    fileParallelism: false,
  },
})
