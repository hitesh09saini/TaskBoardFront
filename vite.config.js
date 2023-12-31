import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://taskapi-n65y.onrender.com',
    },
  },

  routes: [
    { path: '/', component: '/src/components/Signin/Signin.jsx' },
    { path: '/login', component: '/src/components/Login/Login.jsx' },
  ],
})
