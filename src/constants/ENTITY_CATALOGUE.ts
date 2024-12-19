// Local imports
import { COLLISION_CATEGORIES } from '@/constants/COLLISION_CATEGORIES'
import { type EntityDefinition } from '@/typedefs/EntityDefinition'





/** A catalogue of all non-prop entities and their base values. */
export const ENTITY_CATALOGUE: Record<string, EntityDefinition> = {
	'player': {
		boundingBox: {
			height: 16,
			width: 17,
			x: 33,
			y: 154,
		},
		colliders: [{
			collisionCategory: COLLISION_CATEGORIES.ACTOR_COLLIDER,
			collisionMask: COLLISION_CATEGORIES.ACTOR_COLLIDER | COLLISION_CATEGORIES.PROP,
			height: 2,
			render: {
				sprite: {
					xOffset: 1,
					xScale: 1,
					yOffset: -5,
					yScale: 1,
				},
			},
			width: 4,
			x: 0,
			y: -5,
		}],
		health: 100,
		speed: 1,
		zOffset: 6,
	},
}
