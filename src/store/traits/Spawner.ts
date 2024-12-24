// Module imports
import { ENTITY_CATALOGUE } from '@/constants/ENTITY_CATALOGUE'
import { SpawnsOnType } from '@/typedefs/SpawnsOnType'
import { trait } from 'koota'





export const Spawner = trait({
	delay: 0,
	entityCount: 0,
	entityType: '' as keyof typeof ENTITY_CATALOGUE,
	frequency: 0,
	maxEntityCount: 0,
	spawnsOn: '' as SpawnsOnType,
})
