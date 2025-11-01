import path from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Set the base to be the repository name in the case it's running on GitHub Actions
// otherwise just default to '/'
const base = process.env.GITHUB_ACTIONS === 'true' ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1]}/` : '/';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), ViteImageOptimizer()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    base,
});
