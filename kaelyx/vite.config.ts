import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    open: true,
    host: true
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        fatalDeprecations: [
          
        ],
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@component': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@view': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@asset': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/routers', import.meta.url)),
      '@service': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@util': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@composable': fileURLToPath(new URL('./src/composables', import.meta.url)),
      '@type': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@style': fileURLToPath(new URL('./src/assets/styles', import.meta.url)),
    },
  },
})
