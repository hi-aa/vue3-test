import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		proxy: {
			'/v1': {
				target: 'https://openapi.naver.com',
				changeOrigin: true,
			},
			'/system': {
				target: 'http://192.168.0.109:8110',
				// target: 'http://localhost:8110',
				changeOrigin: true,
			},
			'/sample': {
				target: 'http://localhost:8110',
				changeOrigin: true,
			},
		},
	},
});
