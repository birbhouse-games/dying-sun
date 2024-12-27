// Module imports
import { Composite } from 'matter-js'





// Local imports
import {
	Actor,
	Position,
} from '@/store/traits'
import { world } from '@/store/world'





/** Moves actor sprites based on their physics body's position. */
export function actorSystem() {
	world.query(Actor, Position).updateEach(([actor, position]) => {
		const collider = Composite.allBodies(actor.bodies).find(body => body.label === 'collider')!

		position.x = collider.bounds.min.x + ((collider.bounds.max.x - collider.bounds.min.x) / 2)
		position.y = collider.bounds.min.y + ((collider.bounds.max.y - collider.bounds.min.y) / 2)
	}, { changeDetection: true })
}
