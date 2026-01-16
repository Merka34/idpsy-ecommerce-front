import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    allowedHosts: ['1mt1wg-ip-189-179-108-55.tunnelmole.net'],
    proxy: {
      '/api': {
        target: 'https://idpsy-ecommerce-back.onrender.com',
        changeOrigin: true,
        secure: false
      },
      // AGREGA ESTO:
      '/uploads': {
        target: 'https://idpsy-ecommerce-back.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})