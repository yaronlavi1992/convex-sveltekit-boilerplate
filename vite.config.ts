import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		port: 5173,
	},
	ssr: {
		noExternal: ["convex"],
	},
	optimizeDeps: {
		exclude: ["convex"],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					'better-auth': ['better-auth', '@convex-dev/better-auth'],
					'polar': ['@polar-sh/sdk', '@polar-sh/better-auth'],
				},
			},
		},
	},
});
