// Module imports
import {
	Bodies,
	Body,
} from 'matter-js'
import {
	type Ellipse,
	type Point,
	type Polygon,
	type Rectangle,
} from 'pixi-tiled-loader'





// Local imports
import { COLLISION_CATEGORIES } from '@/constants/COLLISION_CATEGORIES'





// Constants
const PROP_COLLIDER_OPTIONS = {
	collisionFilter: {
		category: COLLISION_CATEGORIES.PROP,
		mask: COLLISION_CATEGORIES.ACTOR_COLLIDER,
	},
	isStatic: true,
	label: 'collider',
	slop: 0,
}





/**
 * Creates Matter.js bodies from Tiled objects.
 *
 * @param object The Tiled object.
 * @param baseX The base X position of the object (usually the position of the placement cell in the tilemap).
 * @param baseY The base Y position of the object (usually the position of the placement cell in the tilemap).
 * @returns The Matter.js body.
 */
export function createObjectBody(
	object: Ellipse | Point | Polygon | Rectangle,
	baseX: number = 0,
	baseY: number = 0,
) {
	let body: null | Body = null

	switch (object.type) {
		case 'ellipse':
			// body = Bodies(
			// 	tileX + object.x,
			// 	tileY + object.y,
			// 	[object.points],
			// 	PROP_COLLIDER_OPTIONS,
			// )
			// Composite.add(entity.bodies, body)
			break

		case 'point':
			break

		case 'polygon': {
			body = Bodies.fromVertices(
				0,
				0,
				[object.points],
				PROP_COLLIDER_OPTIONS,
			)

			const bodyHeight = body.bounds.max.y - body.bounds.min.y
			const bodyWidth = body.bounds.max.x - body.bounds.min.x

			Body.setPosition(body, {
				x: baseX + object.x + (bodyWidth / 2),
				y: baseY + object.y + (bodyHeight / 2),
			})
			break
		}

		case 'rectangle':
			body = Bodies.rectangle(
				baseX + object.x + (object.width / 2),
				baseY + object.y + (object.height / 2),
				object.width,
				object.height,
				PROP_COLLIDER_OPTIONS,
			)
			break

		default:
			console.error('unrecognised object type', object)
	}

	return body
}
