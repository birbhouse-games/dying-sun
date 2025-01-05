// Local imports
import { ACTOR_CATALOGUE } from '@/constants/ACTOR_CATALOGUE'
import { Node as BehaviorNode } from 'behaviortree'
import { COLLISION_CATEGORIES } from '@/constants/COLLISION_CATEGORIES'
import { type Vector2 } from '@/typedefs/Vector2'





export type ActorCollider = Vector2 & {
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
}

export interface ActorDefinition {
	actorType: keyof typeof ACTOR_CATALOGUE,
	behaviorTree?: BehaviorNode,
	boundingBox: {
		height: number,
		width: number,
	},
	colliders: [ActorCollider],
	health: number,
	idle?: {
		max: number,
		min: number,
	},
	speed: number,
	zOffset: number,
}
