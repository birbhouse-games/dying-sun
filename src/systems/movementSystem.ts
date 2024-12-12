// Module imports
import { Body } from 'matter-js'





// Local imports
import { ECS } from '@/helpers/ECS'





// Constants
const PLAYER_ENTITIES = ECS.world.with('bodies', 'isPlayer', 'position', 'velocity', 'speed')





export function movementSystem() {
	for (const entity of PLAYER_ENTITIES) {
		Body.setVelocity(entity.bodies.bodies[0], {
			x: entity.velocity.state.x,
			y: entity.velocity.state.y,
		})
	}
}
