// Module imports
import { memo } from 'react'


// Local imports
import {
	ECS,
	query,
} from '@/helpers/ECS'
import { ActorView } from '@/components/Actor/Actor'
import { TileView } from '@/components/TileView/TileView'





/**
 * Renders all entities in a single layer. Simplifies z sorting.
 *
 * @component
 */
export const EntitiesRenderer = memo(() => {
	return (
		<container
			label={'entities'}
			sortableChildren>
			<ECS.Entities
				// eslint-disable-next-line react/no-children-prop
				children={TileView}
				in={query.tile} />
			<ECS.Entities
				// eslint-disable-next-line react/no-children-prop
				children={ActorView}
				in={query.actor} />
		</container>
	)
})
