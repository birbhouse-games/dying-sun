// Local imports
import { COLLISION_CATEGORIES } from '@/constants/COLLISION_CATEGORIES'
import { type EntityDefinition } from '@/typedefs/EntityDefinition'
import { WanderSequence } from '@/behaviors/WanderSequence'





/** A catalogue of all non-prop entities and their base values. */
export const ENTITY_CATALOGUE: Record<string, EntityDefinition> = {
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
					yOffset: -15,
				},
			},
			width: 5,
			x: 0,
			y: 0,
		}],
		health: 100,
		speed: 0.7,
		zOffset: 0,
	},

	'merchant': {
		actorType: 'merchant',
		behaviorTree: WanderSequence,
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
					yOffset: -15,
				},
			},
			width: 8,
			x: 12,
			y: 22,
		}],
		health: 100,
		idle: {
			max: 10 * 1000,
			min: 2 * 1000,
		},
		speed: 0.5,
		zOffset: 0,
	},

	'war-droid': {
		actorType: 'war-droid',
		behaviorTree: WanderSequence,
		boundingBox: {
			height: 21,
			width: 30,
		},
		colliders: [{
			collisionCategory: COLLISION_CATEGORIES.ACTOR_COLLIDER,
			collisionMask: COLLISION_CATEGORIES.PROP,
			height: 4,
			render: {
				sprite: {
					xOffset: 23,
					yOffset: -9,
				},
			},
			width: 17,
			x: 12,
			y: 22,
		}],
		health: 100,
		idle: {
			max: 6 * 1000,
			min: 1 * 1000,
		},
		speed: 0.3,
		zOffset: 11,
	},
}
