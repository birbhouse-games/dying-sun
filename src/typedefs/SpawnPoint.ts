// Module imports
import {
	type CustomInt,
	type CustomString,
	type Point,
} from 'pixi-tiled-loader'





// Local imports
import { ENTITY_CATALOGUE } from '@/constants/ENTITY_CATALOGUE'
import { type SpawnsOnType } from '@/typedefs/SpawnsOnType'





export type SpawnPoint = Point<{
	delay?: CustomInt,
	entityType: CustomString<keyof typeof ENTITY_CATALOGUE>,
	frequency?: CustomInt,
	maxEntityCount?: CustomInt,
	spawnsOn: CustomString<SpawnsOnType>,
}>
