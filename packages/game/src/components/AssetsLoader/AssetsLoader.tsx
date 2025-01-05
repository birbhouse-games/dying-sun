// Module imports
import { useWorld } from 'koota/react'





// Local imports
import {
	loadAssetBundles,
	loadLevel,
	loadManifest,
} from '@/helpers/loaders'





let promise: Promise<unknown>


/**
 * Parent for all loader components.
 *
 * @component
 */
export function AssetsLoader() {
	const world = useWorld()

	if (!promise) {
		promise = loadManifest(world)
			.then(() => loadAssetBundles(world))
			.then(() => loadLevel(world))
	}

	return null
}
