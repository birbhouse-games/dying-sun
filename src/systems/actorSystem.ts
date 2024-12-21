// Module imports
import { Composite } from 'matter-js'





// Local imports
import { query } from '@/helpers/ECS'





/** Moves actor sprites based on their physics body's position. */
export function actorSystem() {
	for (const entity of query.actor) {
		const collider = Composite
			.allBodies(entity.bodies)
			.find(body => body.label === 'collider')!

		entity.position.set(() => {
			return {
				x: collider.bounds.min.x + ((collider.bounds.max.x - collider.bounds.min.x) / 2),
				y: collider.bounds.min.y + ((collider.bounds.max.y - collider.bounds.min.y) / 2),
			}
		})
	}
}
