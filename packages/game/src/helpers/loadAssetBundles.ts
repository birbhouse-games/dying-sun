// Module imports
import { Assets } from 'pixi.js'
import { World } from 'koota'





// Local imports
import { AssetRegistry } from '@/store/traits'





/**
 * Parses asset bundles from the manifest and loads all relevant files.
 *
 * @param world The Koota world.
 */
export async function loadAssetBundles(world: World) {
	const assetRegistry = world.get(AssetRegistry)!

	// Initialise bundle registry
	if (assetRegistry.manifest && !assetRegistry.areBundlesInitialised) {
		await Assets.init({
			basePath: '/assets',
			manifest: assetRegistry.manifest,
		})

		assetRegistry.areBundlesInitialised = true

		assetRegistry.bundles = Object.fromEntries(
			assetRegistry.manifest.bundles.map(bundle => [bundle.name, null]),
		)

		world.set(AssetRegistry, assetRegistry)
	}

	// Load bundles
	if (assetRegistry.areBundlesInitialised) {
		for (const bundleName in assetRegistry.bundles) {
			const bundle = await Assets.loadBundle(bundleName)
			assetRegistry.bundles[bundleName] = bundle
		}

		assetRegistry.areBundlesLoaded = true

		world.set(AssetRegistry, assetRegistry)
	}
}
