import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      __IS_DEV__: JSON.stringify(true),
      __API__: JSON.stringify(env.API),
    },
    plugins: [svgr(), react()],
    resolve: {
      alias: 
        {
          '@': resolve(__dirname, './src')
        },
    },
    server: {
      host: true,
      open: true,
      port: 3050,
    },
    optimizeDeps: {
      exclude: ['js-big-decimal']
    }
  }


})
