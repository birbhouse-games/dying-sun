// Module imports
import { Suspense } from 'react'
import { useStore } from 'statery'





// Local imports
import { BundleLoader } from '@/components/BundleLoader/BundleLoader'
import { store } from '@/store/store'





let manifestLoadingPromise: Promise<unknown>





/**
 * Loads the manifest file, then starts the bundle loader.
 *
 * @component
 */
export function ManifestLoader() {
	const { manifest } = useStore(store)

	if (!manifest && !manifestLoadingPromise) {
		manifestLoadingPromise = fetch('/assets/manifest.json')
			.then(result => result.json())
			.then(result => store.set(() => ({ manifest: result })))

		throw manifestLoadingPromise
	}

	return (
		<Suspense fallback={'Loading asset bundles...'}>
			<BundleLoader />
		</Suspense>
	)
}
