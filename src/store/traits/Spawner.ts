// Module imports
import { ACTOR_CATALOGUE } from '@/constants/ACTOR_CATALOGUE'
import { SpawnsOnType } from '@/typedefs/SpawnsOnType'
import { trait } from 'koota'





export const Spawner = trait({
	delay: 0,
	entityCount: 0,
	entityType: '' as keyof typeof ACTOR_CATALOGUE,
	frequency: 0,
	maxEntityCount: 0,
	spawnsOn: '' as SpawnsOnType,
	lastSpawnAt: 0,
})
