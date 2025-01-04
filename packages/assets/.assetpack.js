// Module imports
import { pixiPipes } from '@assetpack/core/pixi'






/** @type {import('@assetpack/core').AssetPackConfig} */
export default {
	entry: './src',
	ignore: [
		'**/*.tiled-project',
		'**/*.tiled-session',
	],
	output: './public/assets',
	pipes: [...pixiPipes({
		cacheBust: false,
		compression: {
			png: {
				palette: true,
				quality: 100,
			},
			webp: false,
		},
		texturePacker: {
			resolutionOptions: {
				fixedResolution: 'default',
			},
			texturePacker: {
				allowRotation: false,
				allowTrim: false,
				nameStyle: 'relative',
				padding: 0,
			},
		},
		manifest: {
			createShortcuts: true,
			trimExtensions: true,
		},
	})],
}
