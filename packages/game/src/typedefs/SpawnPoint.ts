// Module imports
import {
	type CustomBool,
	type CustomInt,
	type CustomString,
	type Point,
} from 'pixi-tiled-loader'





// Local imports
import { ACTOR_CATALOGUE } from '@/constants/ACTOR_CATALOGUE'
import { type SpawnsOnType } from '@/typedefs/SpawnsOnType'





export type SpawnPoint = Point<{
	delay?: CustomInt,
	entityType: CustomString<keyof typeof ACTOR_CATALOGUE>,
	frequency?: CustomInt,
	isPlayer?: CustomBool,
	maxEntityCount?: CustomInt,
	spawnsOn: CustomString<SpawnsOnType>,
}>
