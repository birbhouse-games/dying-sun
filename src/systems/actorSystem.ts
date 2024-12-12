// Module imports
import { Composite } from 'matter-js'





// Local imports
import { ECS } from '@/helpers/ECS'





// Constants
const PLAYER_ENTITIES = ECS.world.with('bodies', 'isPlayer', 'position')





export function actorSystem() {
	for (const entity of PLAYER_ENTITIES) {
		const collider = Composite
			.allBodies(entity.bodies)
			.find(body => body.label === 'collider')!

		entity.position.set(() => {
			// @ts-expect-error xOffset is missing from the Matter.js types.
			const xOffset = collider.render.sprite?.xOffset ?? 0
			// @ts-expect-error yOffset is missing from the Matter.js types.
			const yOffset = collider.render.sprite?.yOffset ?? 0

			return {
				x: collider.bounds.min.x + xOffset,
				y: collider.bounds.min.y + yOffset,
			}
		})
	}
}
