// Module imports
import { type With } from 'miniplex'





// Local imports
import { type Entity } from '@/typedefs/Entity'
import { query } from '@/helpers/ECS'
import { quicksort } from '@/helpers/quicksort'





// Types
type EntityWithComponents = With<Entity, 'position' | 'zIndex' | 'zOffset'>





/** Sorts sprites based on where they should overlap. */
export function entitySortSystem() {
	const sortedEntities = quicksort<EntityWithComponents, number>(
		query.sortable.entities,
		entity => entity.position.state.y + entity.zOffset,
	)

	let index = sortedEntities.length - 1

	while (index >= 0) {
		const entity = sortedEntities[index]

		entity.zIndex.set(() => ({
			value: index,
		}))

		index -= 1
	}
}
