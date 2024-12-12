// Module imports
import { useStore } from 'statery'
import { type With } from 'miniplex'





// Local imports
import { type Entity } from '@/typedefs/Entity'
import { Tile } from '@/components/Tile/Tile'





export function TileEntity(entity: With<Entity, 'position' | 'tile' | 'zIndex'>) {
	const {
		x: positionX,
		y: positionY,
	} = useStore(entity.position)
	const { value: zIndex } = useStore(entity.zIndex)

	return (
		<Tile
			tile={entity.tile}
			x={positionX}
			y={positionY}
			zIndex={zIndex} />
	)
}
