// Module imports
import { Suspense } from 'react'
import { useStore } from 'statery'





// Local imports
import { loadAssetBundles } from '@/helpers/loadAssetBundles'
import { store } from '@/store/store'
import { WorldLoader } from '@/components/WorldLoader/WorldLoader'





// Variables
let bundleLoadingPromise: Promise<unknown>





/**
 * Loads all asset bundles, then starts the world loader.
 *
 * @component
 */
export function BundleLoader() {
	const {
		areAssetsInitialised,
		areBundlesLoaded,
		manifest,
	} = useStore(store)

	if (!manifest || !areAssetsInitialised || !areBundlesLoaded) {
		if (!bundleLoadingPromise) {
			bundleLoadingPromise = loadAssetBundles()
		}

		throw bundleLoadingPromise
	}

	return (
		<Suspense fallback={'Initialising the world...'}>
			<WorldLoader />
		</Suspense>
	)
}
