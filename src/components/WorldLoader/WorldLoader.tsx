// Module imports
import {
	type GroupLayer,
	type Layer,
	type ObjectLayer,
	type Tilemap,
} from 'pixi-tiled-loader'
import { Assets } from 'pixi.js'
import { Common, Composite } from 'matter-js'
import decomp from 'poly-decomp'
import { useEffect } from 'react'
import { useStore } from 'statery'





// Local imports
import { createObjectBody } from '@/helpers/createObjectBody'
import { createPlayerEntity } from '@/helpers/createPlayerEntity'
import { createPropEntity } from '@/helpers/createPropEntity'
import { store } from '@/store/store'





// Functions
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





export function WorldLoader () {
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
					Composite.add(physicsEngine.world, layer.objects
						.map(object => createObjectBody(object))
						.filter(body => !!body))
				}
			})

			createPlayerEntity()

			Composite.allComposites(physicsEngine.world)

			store.set(() => ({ isWorldInitialised: true }))
		}
	}, [isWorldInitialised])

	return 'Loaded!'
}
