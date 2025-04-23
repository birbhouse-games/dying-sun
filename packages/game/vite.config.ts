// Module imports
import {
	fileURLToPath,
	URL,
} from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'





export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	publicDir: fileURLToPath(new URL('../assets/public', import.meta.url)),
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})
