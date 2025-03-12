import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      modernPolyfills: true
    })
  ],
  server: {
    open: true
  },
  base: command === 'serve' ? '/' : '/drone-game/',
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: true,
    outDir: 'dist',
    assetsDir: '',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three']
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|glb|gltf/i.test(ext)) {
            return `[name][extname]`;
          }
          return `[name]-[hash][extname]`;
        },
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: '[name]-[hash].js'
      }
    }
  }
}));