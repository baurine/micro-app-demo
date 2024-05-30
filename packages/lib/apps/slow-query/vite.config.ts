import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'SlowQueryApp',
      fileName: 'lib'
    },
    rollupOptions: {
      input: 'src/main.tsx',
      external: ['react', 'react-dom', 'react-dom/client'],
      output: {
        // format: 'system',
        // Provide global variables to use in the UMD build
        // for externalized deps
        // globals: {
        //   react: 'React',
        //   'react-dom': 'ReactDOM'
        // },
      },
      // preserveEntrySignatures: "allow-extension",
    }
  }
})
