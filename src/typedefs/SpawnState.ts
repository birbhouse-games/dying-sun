// Local imports
import { ENTITY_CATALOGUE } from '@/constants/ENTITY_CATALOGUE'
import { type SpawnsOnType } from '@/typedefs/SpawnsOnType'





export interface SpawnState {
	entityType: keyof typeof ENTITY_CATALOGUE,
	spawnsOn: SpawnsOnType,
}
