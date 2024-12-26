// Local imports
import { ACTOR_CATALOGUE } from '@/constants/ACTOR_CATALOGUE'
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
	boundingBox: {
		height: number,
		width: number,
	},
	colliders: [ActorCollider],
	health: number,
	speed: number,
	zOffset: number,
}
