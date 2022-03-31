import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

export const aliases = {
  '@': path.resolve(__dirname, './src'),
  '@components': path.resolve(__dirname, './src/components'),
  '@views': path.resolve(__dirname, './src/views'),
  '@assets': path.resolve(__dirname, './src/assets'),
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: aliases,
  },
})
