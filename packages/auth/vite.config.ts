// Module imports
import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'





export default defineConfig({
	build: {
		copyPublicDir: false,
		rollupOptions: {
			external: [
				'react',
				'react/jsx-runtime',
			],
		},
	},
	plugins: [react()],
	publicDir: path.resolve(
		__dirname,
		'..',
		'assets',
		'public',
	),
})
