import path from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), ViteImageOptimizer()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
