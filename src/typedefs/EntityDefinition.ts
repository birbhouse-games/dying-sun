// Local imports
import { Node as BehaviorNode } from 'behaviortree'
import { COLLISION_CATEGORIES } from '@/constants/COLLISION_CATEGORIES'
import { ENTITY_CATALOGUE } from '@/constants/ENTITY_CATALOGUE'
import { type Vector2 } from '@/typedefs/Vector2'





export interface EntityDefinition {
	actorType: keyof typeof ENTITY_CATALOGUE,
	behaviorTree?: BehaviorNode,
	boundingBox: {
		height: number,
		width: number,
	},
	colliders: [Vector2 & {
		collisionCategory: COLLISION_CATEGORIES,
		collisionMask: number,
		height: number,
		render?: {
			sprite: {
				xOffset: number,
				xScale: number,
				yOffset: number,
				yScale: number,
			},
		},
		width: number,
	}],
	health: number,
	idle?: {
		max: number,
		min: number,
	},
	speed: number,
	zOffset: number,
}
