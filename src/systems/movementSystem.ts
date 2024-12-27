// Module imports
import { Body } from 'matter-js'





// Local imports
import {
	Actor,
	Velocity,
} from '@/store/traits'
import { world } from '@/store/world'





/** Moves physics bodies based on their owner entity's velocity. */
export function movementSystem() {
	world.query(Actor, Velocity).updateEach(([actor, velocity]) => {
		Body.setVelocity(actor.bodies.bodies[0], {
			x: velocity.x,
			y: velocity.y,
		})
	})
}
