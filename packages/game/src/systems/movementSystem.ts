// Module imports
import { Body } from 'matter-js'





// Local imports
import { query } from '@/helpers/ECS'





/** Moves physics bodies based on their owner entity's velocity. */
export function movementSystem() {
	for (const entity of query.actor) {
		for (const body of entity.bodies.bodies) {
			Body.setVelocity(body, {
				x: entity.velocity.state.x,
				y: entity.velocity.state.y * 0.5,
			})
		}
	}
}
