import { SpawnPoint } from "@/typedefs/SpawnPoint"
import { Cell, GridTile, GroupLayer, ImageTile, isPoint, Layer, ObjectLayer, TiledObjectGroup, Tilemap } from "pixi-tiled-loader"

type TileData = [Cell, GridTile | ImageTile, Tilemap]

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

/**
 * Gets the backgrounds from the tilemap.
 *
 * @param tilemap The tilemap to get backgrounds from.
 * @returns An array of backgrounds.
 */
export function getBackgroundsFromTilemap(tilemap: Tilemap) {
	const backgrounds = [] as TileData[]

	const tilesets = Object
		.values(tilemap.tilesets)
		.reverse()

	// eslint-disable-next-line jsdoc/require-jsdoc
	function processLayers(layers: (GroupLayer | Layer | ObjectLayer)[]) {
		for (const layer of layers) {
			if (layer.type === 'layer' && layer.metadata.name !== 'Entities') {
				for (const cell of Object.values(layer.data.cells)) {
					const tilesetDefinition = tilesets.find(tilesetData => tilesetData.firstGid <= cell.id)!
					const tileset = tilesetDefinition.tileset!
					const tile = tileset.tiles[cell.id - tilesetDefinition.firstGid]

					backgrounds.push([cell, tile, tilemap])
				}
			} else if (layer.type === 'group') {
				processLayers(layer.layers)
			}
		}
	}

	processLayers(tilemap.layers)

	return backgrounds


}
