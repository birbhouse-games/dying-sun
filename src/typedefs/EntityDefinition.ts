// Local imports
import { COLLISION_CATEGORIES } from '@/constants/COLLISION_CATEGORIES'





export interface EntityDefinition {
	boundingBox: {
		height: number,
		width: number,
		x: number,
		y: number,
	},
	colliders: [{
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
		x: number,
		y: number,
	}],
	health: number,
	speed: number,
	zOffset: number,
}
