// Module imports
import {
	type GridTile,
	type ImageTile,
} from 'pixi-tiled-loader'
import { Composite } from 'matter-js'
import { type Store } from 'statery'





// Local imports
import { type UUID } from '@/typedefs/UUID'





export type Entity = {
	bodies?: Composite,
	health?: Store<{ value: number }>,
	id?: UUID,
	isPlayer?: boolean,
	isProp?: boolean,
	position?: Store<{
		x: number,
		y: number,
	}>,
	speed?: number,
	tile?: GridTile | ImageTile,
	velocity?: Store<{
		x: number,
		y: number,
	}>,
	zIndex?: Store<{ value: number }>,
	zOffset?: number,
}
