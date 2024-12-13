// Local imports
import { ECS } from '@/helpers/ECS'
import { Player } from '@/components/Player/Player'
import { TileEntity } from '../TileEntity/TileEntity'





// Constants
const playerEntities = ECS.world.with('isPlayer', 'position', 'velocity', 'zIndex')
const tileEntities = ECS.world.with('position', 'tile', 'zIndex')





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
				in={tileEntities} />
			<ECS.Entities
				// eslint-disable-next-line react/no-children-prop
				children={Player}
				in={playerEntities} />
		</container>
	)
}
