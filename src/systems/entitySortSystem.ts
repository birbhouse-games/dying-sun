// Module imports
import {
	Entity,
	Not,
} from 'koota'




// Local imports
import {
	IsBackground,
	Position,
	Rendering,
} from '@/store/traits'
import { quicksort } from '@/helpers/quicksort'
import { world } from '@/store/world'





/** Sorts sprites based on where they should overlap. */
export function entitySortSystem() {
	const entities = world.query(Rendering, Position, Not(IsBackground))
	const sortedEntities = new Array<Entity>(...entities)

	quicksort<Entity, number>(sortedEntities, entity => {
		const { zOffset } = entity.get(Rendering)
		const { y } = entity.get(Position)
		return y + zOffset
	})

	let index = sortedEntities.length - 1

	while (index >= 0) {
		const entity = sortedEntities[index]
		entity.set(Rendering, { zIndex: index })
		index -= 1
	}
}
