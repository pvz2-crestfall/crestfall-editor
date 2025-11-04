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
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    radix: [
                        '@radix-ui/react-aspect-ratio',
                        '@radix-ui/react-collapsible',
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-dropdown-menu',
                        '@radix-ui/react-label',
                        '@radix-ui/react-popover',
                        '@radix-ui/react-radio-group',
                        '@radix-ui/react-scroll-area',
                        '@radix-ui/react-select',
                        '@radix-ui/react-separator',
                        '@radix-ui/react-slider',
                        '@radix-ui/react-slot',
                        '@radix-ui/react-switch',
                        '@radix-ui/react-tabs',
                    ],
                    dnd: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
                    'lucide-react': ['lucide-react'],
                },
            },
        },
    },
    base,
});
