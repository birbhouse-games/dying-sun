// Module imports
import { Suspense } from 'react'





// Local imports
import { AssetRegistry } from '@/store/traits'
import { BundleLoader } from '../BundleLoader/BundleLoader'
import { useTrait } from 'koota/react'
import { world } from '@/store/world'





let manifestLoadingPromise: Promise<unknown>





/**
 * Loads the manifest file, then starts the bundle loader.
 *
 * @component
 */
export function ManifestLoader() {
	const { manifest } = useTrait(world, AssetRegistry)!

	if (!manifest && !manifestLoadingPromise) {
		manifestLoadingPromise = fetch('/assets/manifest.json')
			.then(result => result.json())
			.then(result => world.set(AssetRegistry, { manifest: result }))

		throw manifestLoadingPromise
	}

	return (
		<Suspense fallback={'Loading asset bundles...'}>
			<BundleLoader />
		</Suspense>
	)
}
