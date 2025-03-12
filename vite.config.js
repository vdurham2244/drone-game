import { defineConfig } from 'vite';

export default defineConfig({
    base: '/drone-game/',
    build: {
        outDir: 'dist',
        assetsDir: '',
        rollupOptions: {
            input: 'index.html',
            output: {
                entryFileNames: 'index.js',
                chunkFileNames: '[name]-[hash].js',
                assetFileNames: '[name].[ext]'
            }
        },
        sourcemap: false,
        minify: 'terser',
        target: 'es2015'
    },
    server: {
        open: true
    }
}); 