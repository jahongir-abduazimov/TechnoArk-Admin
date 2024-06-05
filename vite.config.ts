import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(),],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@interfaces', replacement: '/src/interface' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@services', replacement: '/src/service' },
      { find: '@modals', replacement: '/src/components/modals' },
      { find: '@notification', replacement: '/src/utils/notification.ts' },
      { find: '@data-service', replacement: '/src/utils/data-service.ts' },
      { find: '@global-table', replacement: '/src/components/ui/global-table.tsx' },
    ]
  }
})
