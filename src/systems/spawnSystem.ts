// Local imports
import {
	IsCamera,
	Position,
	Spawner,
	Time,
	Viewport,
} from '@/store/traits'
import { ACTOR_CATALOGUE } from '@/constants/ACTOR_CATALOGUE'
import { world } from '@/store/world'





/** Spawns entities based on the spawn entity's state. */
export function spawnSystem() {
	// const {
	// 	now,
	// 	viewport,
	// 	worldPositionX,
	// 	worldPositionY,
	// } = store.state

	// Get world state
	const { now } = world.get(Time)!
	const viewport = world.get(Viewport)!

	// Get camera state
	const camera = world.queryFirst(IsCamera, Position)
	if (!camera) {
		return
	}
	const cameraPosition = camera.get(Position)!

	world.query(Spawner, Position).updateEach(([spawner, spawnPosition]) => {
		const {
			delay,
			entityCount,
			entityType,
			lastSpawnAt,
			maxEntityCount,
			spawnsOn,
		} = spawner

		// Skip if we have the maximum number of entities for this spawn
		if (maxEntityCount <= entityCount) {
			return
		}

		// Skip if the spawn isn't on screen but starts on visible
		if (spawnsOn === 'visible') {
			if (
				spawnPosition.x < cameraPosition.x
				|| spawnPosition.x > cameraPosition.x + viewport.width
				|| spawnPosition.y < cameraPosition.y
				|| spawnPosition.y > cameraPosition.y + viewport.height
			) {
				return
			}
		}

		// Skip if not enough time has passed since the last time this spawn created an entity
		if (now < lastSpawnAt + (entityCount > 0 ? delay : 0)) {
			return
		}

		const actorDefinition = ACTOR_CATALOGUE[entityType]

		// createActorEntity(entityDefinition, spawnX, spawnY)

		// Update the spawner's state
		spawner.entityCount = entityCount + 1
		spawner.lastSpawnAt = now
	})
}
