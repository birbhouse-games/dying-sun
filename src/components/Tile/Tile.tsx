// Module imports
import {
	type GridTile,
	type ImageTile,
} from 'pixi-tiled-loader'





// Types
type Props = {
	tile: GridTile | ImageTile,
	x: number,
	y: number,
	zIndex?: number,
}





export function Tile(props: Props) {
	const {
		tile,
		x,
		y,
		zIndex,
	} = props

	return (
		<container
			label={tile.texture?.label ?? tile.id.toString()}
			x={x}
			y={y}
			zIndex={zIndex}>
			<sprite texture={tile.texture!} />
		</container>
	)
}
