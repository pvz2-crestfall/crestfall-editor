import path from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Set the base to be the repository name in the case it's running on GitHub Actions
// otherwise just default to '/'
const base = process.env.GITHUB_ACTIONS === 'true' ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1]}/` : '/';
console.log('Running in GitHub Actions:', process.env.GITHUB_ACTIONS === 'true');
console.log('Base URL:', base);

const isProduction = process.env.NODE_ENV === 'production';

const profiling = isProduction && {
    'react-dom/client': 'react-dom/profiling',
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), ViteImageOptimizer()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            ...profiling,
        },
    },
    build: {
        minify: true,
    },

    base,
});
