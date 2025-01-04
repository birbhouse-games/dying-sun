// Local imports
import {
	ECS,
	query,
} from '@/helpers/ECS'
import { Actor } from '@/components/Actor/Actor'
import { TileEntity } from '@/components/TileEntity/TileEntity'





/**
 * Renders all entities in a single layer. Simplifies z sorting.
 *
 * @component
 */
export function EntitiesRenderer() {
	return (
		<container
			label={'entities'}
			sortableChildren>
			<ECS.Entities
				// eslint-disable-next-line react/no-children-prop
				children={TileEntity}
				in={query.tile} />
			<ECS.Entities
				// eslint-disable-next-line react/no-children-prop
				children={Actor}
				in={query.actor} />
		</container>
	)
}
