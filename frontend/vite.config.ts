import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

export const aliases = {
  '@': path.resolve(__dirname, './src'),
  '@components': path.resolve(__dirname, './src/components'),
  '@views': path.resolve(__dirname, './src/views'),
  '@assets': path.resolve(__dirname, './src/assets'),
  '@api': path.resolve(__dirname, './src/api'),
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: aliases,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
