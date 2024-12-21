// Module imports
import {
	type GridTile,
	type ImageTile,
} from 'pixi-tiled-loader'





// Local imports
import { type Vector2 } from '@/typedefs/Vector2'





// Types
type Props = Vector2 & {
	tile: GridTile | ImageTile,
	zIndex?: number,
}





/**
 * Renders a tilemap tile with Pixi.js.
 *
 * @component
 */
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
