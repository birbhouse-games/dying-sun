// Module imports
import {
	GridTile,
	ImageTile,
} from 'pixi-tiled-loader'
import { trait } from 'koota'





export const Rendering = trait({
	tile: null as null | GridTile | ImageTile,
	zIndex: 0,
	zOffset: 0,
	visible: true,
})
