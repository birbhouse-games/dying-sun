// Module imports
import { Suspense } from 'react'





// Local imports
import { ManifestLoader } from '@/components/ManifestLoader/ManifestLoader.tsx'





export function AssetsLoader() {
	return (
		<Suspense fallback={'Loading asset manifest...'}>
			<ManifestLoader />
		</Suspense>
	)
}
