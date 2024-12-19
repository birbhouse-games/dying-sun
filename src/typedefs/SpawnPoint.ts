// Module imports
import {
	type CustomString,
	type Point,
} from 'pixi-tiled-loader'





// Local imports
import { ENTITY_CATALOGUE } from '@/constants/ENTITY_CATALOGUE'
import { type SpawnsOnType } from '@/typedefs/SpawnsOnType'





export type SpawnPoint = Point<{
	entityType: CustomString<keyof typeof ENTITY_CATALOGUE>,
	spawnsOn: CustomString<SpawnsOnType>,
}>
