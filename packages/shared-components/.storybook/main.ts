// Module imports
import path from 'node:path'
import { type StorybookConfig } from '@storybook/react-vite'





/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 *
 * @param value The base path.
 * @returns The absolute path.
 */
function getAbsolutePath(value: string) {
	return path.dirname(require.resolve(path.join(value, 'package.json')))
}

const config: StorybookConfig = {
	addons: [
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-onboarding'),
		getAbsolutePath('@chromatic-com/storybook'),
		getAbsolutePath('@storybook/experimental-addon-test'),
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
	staticDirs: ['../../assets/public'],
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(ts|tsx)',
	],
}

export default config
