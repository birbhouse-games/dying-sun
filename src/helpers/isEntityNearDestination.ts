// Local imports
import { type NPCType } from '@/typedefs/NPCType'





/**
 * Checks if an entity is within a threshold of its destination.
 *
 * @param entity The entity to test.
 * @param threshold The maximum offset within which the entity will be considered near.
 * @returns Whether the entity is within the threshold of its destination.
 */
export function isEntityNearDestination(entity: NPCType, threshold = 1) {
	if (!entity.destination.state.value) {
		throw new Error('Entity doesn\'t have a destination.')
	}

	const {
		x: destinationX,
		y: destinationY,
	} = entity.destination.state.value
	const {
		x: entityX,
		y: entityY,
	} = entity.position.state

	const dx = destinationX - entityX
	const dy = destinationY - entityY

	const distanceSquared = (dx ** 2) + (dy ** 2)

	return distanceSquared <= threshold ** 2
}
