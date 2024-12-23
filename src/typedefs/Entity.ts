// Module imports
import {
	type GridTile,
	type ImageTile,
} from 'pixi-tiled-loader'
import { BehaviorTree } from 'behaviortree'
import { Composite } from 'matter-js'
import { type Store } from 'statery'





// Local imports
import { type AttackState } from '@/typedefs/AttackState'
import { type DestinationState } from './DestinationState'
import { ENTITY_CATALOGUE } from '@/constants/ENTITY_CATALOGUE'
import { type HealthState } from '@/typedefs/HealthState'
import { type PositionState } from '@/typedefs/PositionState'
import { type SpawnState } from '@/typedefs/SpawnState'
import { type UUID } from '@/typedefs/UUID'
import { type VelocityState } from '@/typedefs/VelocityState'
import { type ZIndexState } from '@/typedefs/ZIndexState'





export type Entity = {
	actorType?: keyof typeof ENTITY_CATALOGUE,
	attack?: Store<AttackState>,
	behaviorTree?: BehaviorTree,
	bodies?: Composite,
	destination?: Store<DestinationState>,
	health?: Store<HealthState>,
	id?: UUID,
	idle?: {
		max: number,
		min: number,
	},
	position?: Store<PositionState>,
	spawn?: Store<SpawnState>,
	speed?: number,
	tile?: GridTile | ImageTile,
	velocity?: Store<VelocityState>,
	zIndex?: Store<ZIndexState>,
	zOffset?: number,
}
