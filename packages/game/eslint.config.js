// Module imports
import configBirbhouseBase from '@birbhouse/eslint-config'
import configBirbhouseReact from '@birbhouse/eslint-config-react'
import configBirbhouseTypescript from '@birbhouse/eslint-config-typescript'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'





export default tseslint.config(
	configBirbhouseBase,
	configBirbhouseTypescript,
	configBirbhouseReact,
	pluginReactRefresh.configs.vite,
	{ files: ['**/*.{ts,tsx}'] },
)
