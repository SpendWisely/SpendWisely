import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    server: {
      watch: {
        usePolling: true
      }
    },

    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          login: resolve(__dirname, 'src/login.html'),
          signup: resolve(__dirname, 'src/signup.html'),
          aftersignup: resolve(__dirname, 'src/after_signup.html'),
          dashboard: resolve(__dirname, 'src/dashboard.html'),
          transaction: resolve(__dirname, 'src/transaction.html'),
        }
      }
    },

    esbuild: {
      supported: {
        'top-level-await': true
      }
    }
  })