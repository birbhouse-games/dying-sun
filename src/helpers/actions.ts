/* eslint-disable jsdoc/require-jsdoc */
// Module imports
import {
	Bodies,
	Composite,
} from 'matter-js'
import {
	Cell,
	GridTile,
	ImageTile,
	Tilemap,
} from 'pixi-tiled-loader'
import { createActions } from 'koota'





// Local imports
import {
	Actor,
	Attacker,
	IsBackground,
	IsCamera,
	PhysicsBody,
	PhysicsEngine,
	Position,
	Rendering,
	Spawner,
	Velocity,
} from '@/store/traits'
import { ActorDefinition } from '@/typedefs/ActorDefinition'
import { createPhysicsBody } from '@/helpers/createPhysicsBody'
import { DEFAULT_BODY_OPTIONS } from '@/constants/DEFAULT_BODY_OPTIONS'
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
		const { customProperties } = object

		if (!customProperties?.entityType || !customProperties?.spawnsOn) {
			return null
		}

		return world.spawn(
			Position({
				x: object.x,
				y: object.y,
			}),
			Spawner({
				delay: customProperties.delay?.value ?? 5000,
				entityType: customProperties.entityType.value,
				frequency: customProperties.frequency?.value ?? 0,
				maxEntityCount: customProperties.maxEntityCount?.value ?? 10,
				spawnsOn: customProperties.spawnsOn.value,
			}),
		)
	},
	createCamera: (initialPosition = {
		x: 0,
		y: 0,
	}) => {
		return world.spawn(IsCamera, Position(initialPosition))
	},
	createActorEntity: ({
		actorType,
		colliders,
		health,
		speed,
		zOffset,
	}: ActorDefinition,
	position = {
		x: 0,
		y: 0,
	}) => {
		const physicsEngine = world.get(PhysicsEngine)
		const bodies = Composite.create()

		// Create physics bodies from the actor
		colliders.forEach(colliderDefinition => {
			const colliderOptions = {
				...DEFAULT_BODY_OPTIONS,
				collisionFilter: {
					category: colliderDefinition.collisionCategory,
					mask: colliderDefinition.collisionMask,
				},
				label: 'collider',
				render: (colliderDefinition.render ?? {}),
			}

			const collider = Bodies.rectangle(
				position.x + colliderDefinition.x,
				position.y + colliderDefinition.y,
				colliderDefinition.width,
				colliderDefinition.height,
				colliderOptions,
			)

			Composite.add(bodies, collider)
		})

		Composite.add(physicsEngine.world, bodies!)

		return world.spawn(
			Actor({
				actorType,
				bodies,
				health,
				speed,
			}),
			Attacker,
			Position(position),
			Velocity,
			Rendering({ zOffset }),
		)
	},
}))
