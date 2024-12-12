// Local imports
import { ECS } from '@/helpers/ECS'
import { Player } from '@/components/Player/Player'
import { TileEntity } from '../TileEntity/TileEntity'





// Constants
const playerEntities = ECS.world.with('isPlayer', 'position', 'velocity', 'zIndex')
const tileEntities = ECS.world.with('position', 'tile', 'zIndex')





export function EntitiesRenderer() {
	return (
		<container
			label={'entities'}
			sortableChildren>
			<ECS.Entities
				children={TileEntity}
				in={tileEntities} />
			<ECS.Entities
				children={Player}
				in={playerEntities} />
		</container>
	)
}
