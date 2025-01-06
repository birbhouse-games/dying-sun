// Module imports
import {
	GroupLayer,
	Layer,
	ObjectLayer,
	TiledObjectGroup,
	Tilemap,
} from 'pixi-tiled-loader'





/**
 * Gets the boundaries from the tilemap.
 *
 * @param tilemap The tilemap to get boundaries from.
 * @returns An array of boundaries.
 */
export function getBoundariesFromTilemap(tilemap: Tilemap) {
	const boundaries = [] as TiledObjectGroup['objects'][]

	// eslint-disable-next-line jsdoc/require-jsdoc
	function processLayers(layers: (GroupLayer | Layer | ObjectLayer)[]) {
		for (const layer of layers) {
			if (layer.type === 'object' && layer.name.includes('Bounds')) {
				boundaries.push(layer.objects)
			} else if (layer.type === 'group') {
				processLayers(layer.layers)
			}
		}
	}

	processLayers(tilemap.layers)

	return boundaries
}
