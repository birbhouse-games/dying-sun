// Local imports
import { createActorEntity } from '@/helpers/createActorEntity'
import { ENTITY_CATALOGUE } from '@/constants/ENTITY_CATALOGUE'
import { query } from '@/helpers/ECS'
import { store } from '@/store/store'





/** Creates spawner entities. */
export function spawnSystem() {
	const {
		now,
		viewport,
		worldPositionX,
		worldPositionY,
	} = store.state

	const spawnEntities = query.spawn

	for (const spawnEntity of spawnEntities) {
		const {
			x: spawnX,
			y: spawnY,
		} = spawnEntity.position.state
		const {
			delay,
			entityCount,
			entityType,
			lastSpawnAt,
			maxEntityCount,
			spawnsOn,
		} = spawnEntity.spawn.state

		// Skip if we have the maximum number of entities for this spawn
		if (maxEntityCount <= entityCount) {
			continue
		}

		// Skip if the spawn isn't on screen but starts on visible
		if (spawnsOn === 'visible') {
			if (
				spawnX < worldPositionX
				|| spawnX > worldPositionX + viewport.width
				|| spawnY < worldPositionY
				|| spawnY > worldPositionY + viewport.height
			) {
				continue
			}
		}

		// Skip if not enough time has passed since the last time this spawn created an entity
		if (now < lastSpawnAt + (entityCount > 0 ? delay : 0)) {
			continue
		}

		const entityDefinition = ENTITY_CATALOGUE[entityType]

		createActorEntity(entityDefinition, spawnX, spawnY)

		spawnEntity.spawn.set(previousState => ({
			entityCount: previousState.entityCount + 1,
			lastSpawnAt: now,
		}))
	}
}
