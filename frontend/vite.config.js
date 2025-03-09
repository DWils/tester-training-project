import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Écoute sur 0.0.0.0 pour permettre l'accès depuis l'extérieur
    port: 5173, // Assurez-vous que le port correspond
  },
})