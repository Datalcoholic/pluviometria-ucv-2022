import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	build: { target: 'es2017' },
	optimizeDeps: {
		esbuildOptions: { target: 'es2017', supported: { bigint: true } },
	},
});
