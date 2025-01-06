// Module imports
import { useWorld } from 'koota/react'





// Local imports
import { loadAssetBundles } from '@/helpers/loadAssetBundles'
import { loadLevel } from '@/helpers/loadLevel'
import { loadManifest } from '@/helpers/loadManifest'





// Variables
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
