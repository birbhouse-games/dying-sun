// Module imports
import { Suspense } from 'react'
import { useStore } from 'statery'





// Local imports
import { WorldLoader } from '@/components/WorldLoader/WorldLoader'
import { loadAssetBundles } from '@/helpers/loadAssetBundles'
import { store } from '@/store/store.ts'





// Variables
let bundleLoadingPromise: Promise<unknown>





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
