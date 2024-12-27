// Local imports
import { type ActorDefinition } from '@/typedefs/ActorDefinition'
import { COLLISION_CATEGORIES } from '@/constants/COLLISION_CATEGORIES'




/** A catalogue of all non-prop entities and their base values. */
export const ACTOR_CATALOGUE: Record<'hero' | 'merchant', ActorDefinition> = {
	'hero': {
		actorType: 'hero',
		boundingBox: {
			height: 16,
			width: 17,
		},
		colliders: [{
			collisionCategory: COLLISION_CATEGORIES.ACTOR_COLLIDER,
			collisionMask: COLLISION_CATEGORIES.ACTOR_COLLIDER | COLLISION_CATEGORIES.PROP,
			height: 2,
			render: {
				sprite: {
					xOffset: 18,
					xScale: 1,
					yOffset: -15,
					yScale: 1,
				},
			},
			width: 5,
			x: 0,
			y: 0,
		}],
		health: 100,
		speed: 0.7,
		zOffset: 6,
	},

	'merchant': {
		actorType: 'merchant',
		boundingBox: {
			height: 25,
			width: 38,
		},
		colliders: [{
			collisionCategory: COLLISION_CATEGORIES.ACTOR_COLLIDER,
			collisionMask: COLLISION_CATEGORIES.ACTOR_COLLIDER | COLLISION_CATEGORIES.PROP,
			height: 3,
			render: {
				sprite: {
					xOffset: 1,
					xScale: 1,
					yOffset: -15,
					yScale: 1,
				},
			},
			width: 8,
			x: 12,
			y: 22,
		}],
		health: 100,
		speed: 1,
		zOffset: 7,
	},
}
