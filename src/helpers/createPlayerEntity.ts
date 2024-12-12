// Module imports
import {
	Bodies,
	Composite,
} from 'matter-js'
import { makeStore } from 'statery'





// Local imports
import { COLLISION_CATEGORIES } from '@/constants/COLLISION_CATEGORIES'
import { ECS } from '@/helpers/ECS'
import { store } from '@/store/store'





export function createPlayerEntity() {
	const { physicsEngine } = store.state

	const entityBoundingBox = {
		height: 16,
		width: 17,
		x: 33,
		y: 154,
	}
	const colliderBoundingBox = {
		height: 2,
		width: 4,
		x: 0,
		y: -5,
	}

	const entity = ECS.world.add({
		bodies: Composite.create(),
		health: makeStore({ value: 100 }),
		isPlayer: true,
		speed: 1,
		position: makeStore({
			x: entityBoundingBox.x,
			y: entityBoundingBox.y,
		}),
		velocity: makeStore({
			x: 0,
			y: 0,
		}),
		zIndex: makeStore({ value: 0 }),
		zOffset: 6,
	})

	const collider = Bodies.rectangle(
		entityBoundingBox.x,
		entityBoundingBox.y,
		colliderBoundingBox.width,
		colliderBoundingBox.height,
		{
			collisionFilter: {
				category: COLLISION_CATEGORIES.ACTOR_COLLIDER,
				mask: COLLISION_CATEGORIES.ACTOR_COLLIDER | COLLISION_CATEGORIES.PROP,
			},
			friction: 0,
			inertia: Infinity,
			label: 'collider',
			render: {
				sprite: {
					texture: '',
					// @ts-expect-error xOffset is missing from the Matter.js types.
					xOffset: colliderBoundingBox.x + 1,
					xScale: 1,
					yOffset: colliderBoundingBox.y,
					yScale: 1,
				},
			},
			restitution: 0,
			slop: 0,
		},
	)

	Composite.add(entity.bodies, collider)
	Composite.add(physicsEngine.world, entity.bodies)
}
