// Module imports
import {
	Common,
	Composite,
} from 'matter-js'
import {
	type GroupLayer,
	isPoint,
	type Layer,
	type ObjectLayer,
	type Tilemap,
} from 'pixi-tiled-loader'
import { Assets } from 'pixi.js'
import decomp from 'poly-decomp'
import { useEffect } from 'react'
import { useStore } from 'statery'





// Local imports
import { createObjectBody } from '@/helpers/createObjectBody'
import { createPlayerEntity } from '@/helpers/createPlayerEntity'
import { createPropEntity } from '@/helpers/createPropEntity'
import { createSpawnEntity } from '@/helpers/createSpawnEntity'
import { type SpawnPoint } from '@/typedefs/SpawnPoint'
import { store } from '@/store/store'





/**
 * Filters an array of tilemap layers, returning only layers that have physics entities.
 *
 * @param layers The layers to be filtered.
 * @returns An array of tilemap layers with physics entities.
 */
function getEntityLayers(layers: (GroupLayer | Layer | ObjectLayer)[]): (Layer | ObjectLayer)[] {
	return layers
		.map(layer => {
			if (layer.type === 'layer') {
				if (layer.metadata.name === 'Entities') {
					return layer
				}

				return null
			}

			if (layer.type === 'group') {
				return getEntityLayers(layer.layers)
			}

			return layer
		})
		.flat()
		.filter(item => item !== null)
}





/**
 * Initialises the world.
 *
 * @component
 */
export function WorldLoader() {
	const {
		isWorldInitialised,
		physicsEngine,
	} = useStore(store)

	useEffect(() => {
		if (!isWorldInitialised) {
			Common.setDecomp(decomp)

			const tilemap = Assets.get<Tilemap>('level.tmx')

			const tilesets = Object
				.values(tilemap.tilesets)
				.reverse()

			const entityLayers = getEntityLayers(tilemap.layers)

			entityLayers.forEach(layer => {
				if (layer.type === 'layer') {
					let cellCoordinates: `${string}|${string}`

					for (cellCoordinates in layer.data.cells) {
						const cell = layer.data.cells[cellCoordinates]
						const tilesetDefinition = tilesets.find(tilesetData => tilesetData.firstGid <= cell.id)!
						const tileset = tilesetDefinition.tileset!

						const tile = tileset.tiles[cell.id - tilesetDefinition.firstGid]

						createPropEntity(cell, tile, tilemap)
					}
				} else if (layer.type === 'object') {
					// Create bodies for world objects
					Composite.add(physicsEngine.world, layer.objects
						.map(object => createObjectBody(object))
						.filter(body => !!body))

					// Create spawn entities
					layer.objects
						.filter(object => isPoint(object))
						.filter(object => object.class === 'spawn')
						.forEach(object => {
							createSpawnEntity(object as SpawnPoint)
						})
				}
			})

			createPlayerEntity(33, 154)

			Composite.allComposites(physicsEngine.world)

			store.set(() => ({ isWorldInitialised: true }))
		}
	}, [
		isWorldInitialised,
		physicsEngine.world,
	])

	return 'Loaded!'
}
