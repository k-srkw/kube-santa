import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    // OpenShift Dev Spaces の動的ホスト名に対応
    allowedHosts: [
      '.apps.cluster-8s6wr.8s6wr.sandbox2809.opentlc.com',
      '.opentlc.com',
      'localhost',
      '.localhost',
    ],
    hmr: {
      clientPort: 443, // OpenShift Dev Spaces では HTTPS を使用
    },
  },
})

