import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.PORTFOLIO_BASE || '/',
  plugins: [react()],
})
