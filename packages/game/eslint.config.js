// Module imports
import configBirbhouseBase from '@birbhouse/eslint-config'
import configBirbhouseTypescript from '@birbhouse/eslint-config-typescript'
import configBirbhouseReact from '@birbhouse/eslint-config-react'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'





export default tseslint.config(
	configBirbhouseBase,
	configBirbhouseTypescript,
	configBirbhouseReact,
	pluginReactRefresh.configs.vite,
	{ files: ['**/*.{ts,tsx}'] },
)
