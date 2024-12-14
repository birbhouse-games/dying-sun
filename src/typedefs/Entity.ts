// Module imports
import {
	type GridTile,
	type ImageTile,
} from 'pixi-tiled-loader'
import { Composite } from 'matter-js'
import { type Store } from 'statery'





// Local imports
import { type HealthState } from '@/typedefs/HealthState'
import { type IsAttackingState } from '@/typedefs/IsAttackingState'
import { type PositionState } from '@/typedefs/PositionState'
import { type UUID } from '@/typedefs/UUID'
import { type VelocityState } from '@/typedefs/VelocityState'
import { type ZIndexState } from '@/typedefs/ZIndexState'





export type Entity = {
	bodies?: Composite,
	health?: Store<HealthState>,
	id?: UUID,
	isAttacking?: Store<IsAttackingState>,
	isPlayer?: boolean,
	isProp?: boolean,
	position?: Store<PositionState>,
	speed?: number,
	tile?: GridTile | ImageTile,
	velocity?: Store<VelocityState>,
	zIndex?: Store<ZIndexState>,
	zOffset?: number,
}
