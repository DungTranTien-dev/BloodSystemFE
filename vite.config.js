import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: {
      overlay: false // Disable error overlay
    }
  },  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor libraries into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('redux') || id.includes('react-redux') || id.includes('redux-persist')) {
              return 'vendor-redux';
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons';
            }
            if (id.includes('antd') || id.includes('@ant-design')) {
              // Split antd into smaller chunks
              if (id.includes('icons')) {
                return 'vendor-antd-icons';
              }
              if (id.includes('cssinjs') || id.includes('theme')) {
                return 'vendor-antd-theme';
              }
              return 'vendor-antd-core';
            }
            // Other vendor libraries
            return 'vendor-misc';
          }
          
          // Group application code by feature
          if (id.includes('/pages/admin/')) {
            return 'admin';
          }
          if (id.includes('/pages/home/') || id.includes('/pages/blog/')) {
            return 'public';
          }
          if (id.includes('/pages/news/')) {
            return 'news';
          }
          if (id.includes('/components/')) {
            return 'components';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase warning limit to 1MB
  }
})
