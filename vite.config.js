import { defineConfig } from 'vite';

export default defineConfig({
    base: '/drone-game/',
    build: {
        outDir: 'dist',
        assetsDir: '',
        rollupOptions: {
            output: {
                entryFileNames: 'index.js',
                chunkFileNames: '[name]-[hash].js',
                assetFileNames: '[name].[ext]'
            }
        }
    },
    server: {
        open: true
    }
}); 