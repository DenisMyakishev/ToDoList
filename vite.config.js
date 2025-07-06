import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			components: '/src/components',
			hooks: '/src/hooks',
			store: '/src/store',
			utils: '/src/utils',
			constants: '/src/constants',
			assets: '/src/assets',
			themes: '/src/themes',
			pages: '/src/pages',
		},
	},
});
