/* eslint-disable jsdoc/require-jsdoc */
// Module imports
import {
	Cell,
	GridTile,
	ImageTile,
	Tilemap,
} from 'pixi-tiled-loader'
import { createActions } from 'koota'





// Local imports
import {
	IsBackground,
	IsCamera,
	PhysicsBody,
	PhysicsEngine,
	Position,
	Rendering,
	Spawner,
} from '@/store/traits'
import { Composite } from 'matter-js'
import { createPhysicsBody } from './createPhysicsBody'
import { SpawnPoint } from '@/typedefs/SpawnPoint'




export const actions = createActions(world => ({
	createPropEntity: (cell: Cell, tile: GridTile | ImageTile, tilemap: Tilemap) => {
		const physicsEngine = world.get(PhysicsEngine)

		const tileX = cell.x * tilemap.metadata.tileWidth
		const tileY = (cell.y * tilemap.metadata.tileHeight) - (tile.height - tilemap.metadata.tileHeight)
		const zOffsetProperty = tile.customProperties?.zOffset
		const bodies = Composite.create()

		// Create physics bodies from the tile's object groups
		if (tile.objectGroups) {
			for (const objectGroup of tile.objectGroups) {
				for (const object of objectGroup.objects) {
					const body = createPhysicsBody(object, tileX, tileY)

					if (body) {
						Composite.add(bodies, body)
					}
				}
			}

			Composite.add(physicsEngine.world, bodies)
		}

		// Spawn entity
		return world.spawn(
			PhysicsBody(bodies),
			Position({
				x: tileX,
				y: tileY,
			}),
			Rendering({
				tile,
				zIndex: 0,
				zOffset: zOffsetProperty?.type === 'int' ? zOffsetProperty.value : 0,
			}),
		)
	},
	createBackgroundEntity: (cell: Cell, tile: GridTile | ImageTile, tilemap: Tilemap) => {
		const tileX = cell.x * tilemap.metadata.tileWidth
		const tileY = (cell.y * tilemap.metadata.tileHeight) - (tile.height - tilemap.metadata.tileHeight)
		const zOffsetProperty = tile.customProperties?.zOffset

		return world.spawn(
			IsBackground,
			Position({
				x: tileX,
				y: tileY,
			}),
			Rendering({
				tile,
				zIndex: 0,
				zOffset: zOffsetProperty?.type === 'int' ? zOffsetProperty.value : 0,
			}),
		)
	},
	createSpawnEntity: (object: SpawnPoint) => {
		if (object.customProperties
			&& object.customProperties.entityType
			&& object.customProperties.spawnsOn) {
			return world.spawn(
				Position({
					x: object.x,
					y: object.y,
				}),
				Spawner({
					delay: object.customProperties.delay?.value ?? 5 * 1000,
					entityCount: 0,
					entityType: object.customProperties.entityType.value,
					frequency: object.customProperties.frequency?.value ?? 0,
					maxEntityCount: object.customProperties.maxEntityCount?.value ?? 10,
					spawnsOn: object.customProperties.spawnsOn.value,
				}),
			)
		}

		return null
	},
	createCamera: (initialPosition = {
		x: 0,
		y: 0,
	}) => {
		return world.spawn(IsCamera, Position(initialPosition))
	},
}))
