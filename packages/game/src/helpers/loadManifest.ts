// Module imports
import { World } from 'koota'





// Local imports
import { AssetRegistry } from '@/store/traits'





/**
 * Loads the manifest file.
 *
 * @param world The Koota world.
 */
export async function loadManifest(world: World) {
	const response = await fetch('/assets/manifest.json')
	const result = await response.json()
	world.set(AssetRegistry, { manifest: result })
}
