// Local imports
import {
	Destination,
	Position,
} from '@/store/traits'
import { Entity } from 'koota'





/**
 * Checks if an entity is within a threshold of its destination.
 *
 * @param entity The entity to test.
 * @param threshold The maximum offset within which the entity will be considered near.
 * @returns Whether the entity is within the threshold of its destination.
 */
export function isEntityNearDestination(entity: Entity, threshold = 1) {
	if (!entity.has(Destination)) {
		throw new Error('Entity doesn\'t have a destination.')
	}

	const {
		x: destinationX,
		y: destinationY,
	} = entity.get(Destination)!
	const {
		x: entityX,
		y: entityY,
	} = entity.get(Position)!

	const dx = destinationX - entityX
	const dy = destinationY - entityY

	const distanceSquared = (dx ** 2) + (dy ** 2)

	return distanceSquared <= threshold ** 2
}
