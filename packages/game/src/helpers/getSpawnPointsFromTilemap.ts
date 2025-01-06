// Module imports
import {
	GroupLayer,
	isPoint,
	Layer,
	ObjectLayer,
	Tilemap,
} from 'pixi-tiled-loader'
import { SpawnPoint } from '@/typedefs/SpawnPoint'





/**
 * Gets the spawn points from the tilemap.
 *
 * @param tilemap The tilemap to get spawn points from.
 * @returns An array of spawn points.
 */
export function getSpawnPointsFromTilemap(tilemap: Tilemap) {
	const spawnPoints = [] as SpawnPoint[]

	// eslint-disable-next-line jsdoc/require-jsdoc
	function processLayers(layers: (GroupLayer | Layer | ObjectLayer)[]) {
		for (const layer of layers) {
			if (layer.type === 'object' && layer.name.includes('Spawn')) {
				for (const object of layer.objects) {
					if (isPoint(object) && object.class === 'spawn') {
						spawnPoints.push(object as SpawnPoint)
					}
				}
			} else if (layer.type === 'group') {
				processLayers(layer.layers)
			}
		}
	}

	processLayers(tilemap.layers)

	return spawnPoints
}
