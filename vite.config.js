import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api/v1/user': {
        target: 'http://localhost:3170',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/user/, '/api/v1/user')
      },
      '/api/v1/job': {
        target: 'http://localhost:3170',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/job/, '/api/v1/job')
      },
      '/api/v1/application': {
        target: 'http://localhost:3170',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/application/, '/api/v1/application')
      },
      '/api/v1/company': {
        target: 'http://localhost:3170',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/company/, '/api/v1/company')
      }
    }
  }
});
