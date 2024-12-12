// Module imports
import { Suspense } from 'react'
import { useStore } from 'statery'





// Local imports
import { store } from '@/store/store.ts'
import { BundleLoader } from '@/components/BundleLoader/BundleLoader.tsx'





let manifestLoadingPromise: Promise<unknown>





export function ManifestLoader() {
	const { manifest } = useStore(store)

	if (!manifest && !manifestLoadingPromise) {
		manifestLoadingPromise = fetch('/assets/manifest.json')
			.then(result => result.json())
			.then(result => {
				store.set(() => ({ manifest: result }))
			})

		throw manifestLoadingPromise
	}

	return (
		<Suspense fallback={'Loading asset bundles...'}>
			<BundleLoader />
		</Suspense>
	)
}
