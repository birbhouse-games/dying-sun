// Module imports
import {
	AssetsBundle,
	AssetsManifest,
}	from 'pixi.js'
import { DefaultAssetsBundle } from '@/typedefs/DefaultAssetsBundle'
import { trait } from 'koota'





export const AssetRegistry = trait({
	areBundlesInitialised: false,
	areBundlesLoaded: false,
	isLevelLoaded: false,
	manifest: null as AssetsManifest | null,
	bundles: {} as {
		[key: string]: DefaultAssetsBundle | AssetsBundle | null,
	},
})
