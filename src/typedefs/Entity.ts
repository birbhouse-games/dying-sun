// Module imports
import {
	type GridTile,
	type ImageTile,
} from 'pixi-tiled-loader'
import { Composite } from 'matter-js'
import { type Store } from 'statery'





// Local imports
import { type AttackState } from '@/typedefs/AttackState'
import { ACTOR_CATALOGUE } from '@/constants/ENTITY_CATALOGUE'
import { type HealthState } from '@/typedefs/HealthState'
import { type PositionState } from '@/typedefs/PositionState'
import { type SpawnState } from '@/typedefs/SpawnState'
import { type UUID } from '@/typedefs/UUID'
import { type VelocityState } from '@/typedefs/VelocityState'
import { type ZIndexState } from '@/typedefs/ZIndexState'





export type Entity = {
	actorType?: keyof typeof ACTOR_CATALOGUE,
	attack?: Store<AttackState>,
	bodies?: Composite,
	health?: Store<HealthState>,
	id?: UUID,
	position?: Store<PositionState>,
	spawn?: Store<SpawnState>,
	speed?: number,
	tile?: GridTile | ImageTile,
	velocity?: Store<VelocityState>,
	zIndex?: Store<ZIndexState>,
	zOffset?: number,
}
