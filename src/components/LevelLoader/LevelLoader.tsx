// Module imports
import {
	Body,
	Common,
	Composite,
} from 'matter-js'
import {
	Cell,
	GridTile,
	type GroupLayer,
	ImageTile,
	isPoint,
	type Layer,
	type ObjectLayer,
	TiledObjectGroup,
	type Tilemap,
} from 'pixi-tiled-loader'
import { Assets } from 'pixi.js'
import decomp from 'poly-decomp'
import { useEffect } from 'react'





// Local imports
import {
	AssetRegistry,
	PhysicsEngine,
} from '@/store/traits'
import {
	useActions,
	useTrait,
} from 'koota/react'
import { actions } from '@/helpers/actions'
import { createPhysicsBody } from '@/helpers/createPhysicsBody'
import { type SpawnPoint } from '@/typedefs/SpawnPoint'
import { world } from '@/store/world'





type PropData = [Cell, GridTile | ImageTile, Tilemap]

/**
 * Gets the props from the tilemap.
 *
 * @param tilemap The tilemap to get props from.
 * @returns An array of prop data.
 */
function getPropsFromTilemap(tilemap: Tilemap) {
	const props = [] as PropData[]

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
function getBoundariesFromTilemap(tilemap: Tilemap) {
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
function getSpawnPointsFromTilemap(tilemap: Tilemap) {
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
 * Initialises the world.
 *
 * @component
 */
export function LevelLoader() {
	const { isLevelLoaded } = useTrait(world, AssetRegistry)!
	const physicsEngine = useTrait(world, PhysicsEngine)!

	const {
		createPropEntity,
		createSpawnEntity,
	} = useActions(actions)

	useEffect(() => {
		if (!isLevelLoaded) {
			// Set the decomp library for the physics engine
			Common.setDecomp(decomp)

			// Load the tilemap
			const tilemap = Assets.get<Tilemap>('level.tmx')

			// Create prop entities
			for (const prop of getPropsFromTilemap(tilemap)) {
				createPropEntity(...prop)
			}

			// Create spawn entities
			for (const spawnPoint of getSpawnPointsFromTilemap(tilemap)) {
				createSpawnEntity(spawnPoint)
			}

			// Create boundaries
			for (const boundary of getBoundariesFromTilemap(tilemap)) {
				const bodies = [] as Body[]

				for (const object of boundary) {
					const body = createPhysicsBody(object)

					if (body) {
						bodies.push(body)
					}
				}

				Composite.add(physicsEngine.world, bodies)
			}

			// Set the level as loaded
			world.set(AssetRegistry, { isLevelLoaded: true })
		}
	}, [createPropEntity, createSpawnEntity, isLevelLoaded, physicsEngine])

	return 'Loaded!'
}
