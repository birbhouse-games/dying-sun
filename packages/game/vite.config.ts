// Module imports
import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'





export default defineConfig({
	build: {
		copyPublicDir: false,
		lib: {
			entry: path.resolve(
				__dirname,
				'src',
				'components',
				'Game',
				'Game.tsx',
			),
			formats: ['es'],
		},
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
	resolve: {
		alias: {
			'@': path.resolve(
				__dirname,
				'src',
			),
		},
	},
})
