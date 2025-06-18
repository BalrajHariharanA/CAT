import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),reactRefresh()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
  },
    optimizeDeps:{
    esbuildOptions:{
      plugins:[
        esbuildCommonjs(['canvasjs/react-charts'])
      ]
    }
  }
})
