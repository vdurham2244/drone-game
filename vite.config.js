import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        open: true
    },
    base: './',
    build: {
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                manualChunks: undefined
            }
        }
    }
}); 