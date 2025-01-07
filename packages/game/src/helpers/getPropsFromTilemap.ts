// Module imports
import {
	GroupLayer,
	Layer,
	ObjectLayer,
	Tilemap,
} from 'pixi-tiled-loader'





// Local imports
import { TileData } from '@/typedefs/TileData'





/**
 * Gets the props from the tilemap.
 *
 * @param tilemap The tilemap to get props from.
 * @returns An array of prop data.
 */
export function getPropsFromTilemap(tilemap: Tilemap) {
	const props = [] as TileData[]

	const tilesets = Object
		.values(tilemap.tilesets)
		.reverse()

	// eslint-disable-next-line jsdoc/require-jsdoc
	function processLayers(layers: (GroupLayer | Layer | ObjectLayer)[]) {
		for (const layer of layers) {
			if (layer.type === 'layer' && layer.metadata.name === 'Entities') {
				for (const cell of Object.values(layer.data.cells)) {
					const tilesetDefinition = tilesets.find(tilesetData => tilesetData.firstGid <= cell.id)!
					const tileset = tilesetDefinition.tileset!
					const tile = tileset.tiles[cell.id - tilesetDefinition.firstGid]

					props.push([cell, tile, tilemap])
				}
			} else if (layer.type === 'group') {
				processLayers(layer.layers)
			}
		}
	}

	processLayers(tilemap.layers)

	return props
}
