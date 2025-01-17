// Local imports
import {
	IsCamera,
	Position,
	Spawner,
	Time,
	Viewport,
} from '@/store/traits'
import { actions } from '@/helpers/actions'
import { ACTOR_CATALOGUE } from '@/constants/ACTOR_CATALOGUE'
import { world } from '@/store/world'





/** Spawns entities based on the spawn entity's state. */
export function spawnSystem() {
	// Get world state
	const { now } = world.get(Time)!
	const viewport = world.get(Viewport)!

	// Get camera state
	const camera = world.queryFirst(IsCamera, Position)

	// Skip if there is no camera
	if (!camera) {
		return
	}

	// Get camera position
	const cameraPosition = camera.get(Position)!

	// Get bound action
	const { createActorEntity } = actions(world)

	// Run spawner logic for each spawner
	world.query(Spawner, Position).updateEach(([spawner, spawnPosition]) => {
		const {
			delay,
			entityCount,
			entityType,
			isPlayer,
			lastSpawnAt,
			maxEntityCount,
			spawnsOn,
		} = spawner

		// Skip if we have the maximum number of entities for this spawn
		if (maxEntityCount <= entityCount) {
			return
		}

		const isOffScreen = (
			spawnPosition.x < cameraPosition.x
			|| spawnPosition.x > cameraPosition.x + viewport.width
			|| spawnPosition.y < cameraPosition.y
			|| spawnPosition.y > cameraPosition.y + viewport.height
		)

		// Skip if the spawn isn't on screen but starts on visible
		if (spawnsOn === 'visible' && isOffScreen) {
			return
		}

		// Skip if not enough time has passed since the last time this spawn created an entity
		if (now < lastSpawnAt + (entityCount > 0 ? delay : 0)) {
			return
		}

		// Create the actor from its definition at the spawner's position
		createActorEntity(ACTOR_CATALOGUE[entityType], spawnPosition, isPlayer)

		// Update the spawner's state
		spawner.entityCount = entityCount + 1
		spawner.lastSpawnAt = now
	})
}
