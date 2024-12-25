// Local imports
import { ACTOR_CATALOGUE } from '@/constants/ENTITY_CATALOGUE'
import { type SpawnsOnType } from '@/typedefs/SpawnsOnType'





export interface SpawnState {
	delay: number,
	entityCount: number,
	entityType: keyof typeof ACTOR_CATALOGUE,
	frequency: number,
	lastSpawnAt: number,
	maxEntityCount: number,
	spawnsOn: SpawnsOnType,
}
