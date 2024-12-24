// Module imports
import { Assets } from 'pixi.js'
import { Suspense } from 'react'




// Local imports
import { AssetRegistry } from '@/store/traits'
import { LevelLoader } from '../LevelLoader/LevelLoader'
import { useTrait } from 'koota/react'
import { world } from '@/store/world'




// Variables
let bundleLoadingPromise: Promise<unknown>

/** Parses asset bundles from the manifest and loads all relevant files. */
async function loadAssetBundles() {
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





/**
 * Loads all asset bundles, then starts the world loader.
 *
 * @component
 */
export function BundleLoader() {
	const {
		areBundlesInitialised: areAssetsInitialised,
		areBundlesLoaded,
		manifest,
	} = useTrait(world, AssetRegistry)!

	if (!manifest || !areAssetsInitialised || !areBundlesLoaded) {
		if (!bundleLoadingPromise) {
			bundleLoadingPromise = loadAssetBundles()
		}

		throw bundleLoadingPromise
	}

	return (
		<Suspense fallback={'Initialising the world...'}>
			<LevelLoader />
		</Suspense>
	)
}
