// Module imports
import { makeStore } from 'statery'





// Local imports
import { ECS } from '@/helpers/ECS'
import { type SpawnPoint } from '@/typedefs/SpawnPoint'





/**
 * Creates the Miniplex entity and Matter.js bodies for a player.
 *
 * @param object The X position at which this entity will start.
 * @returns The new entity.
 */
export function createSpawnEntity(
	object: SpawnPoint,
) {
	if (
		object.customProperties
		&& object.customProperties.entityType
		&& object.customProperties.spawnsOn
	) {
		return ECS.world.add({
			position: makeStore({
				x: object.x,
				y: object.y,
			}),
			spawn: makeStore({
				delay: object.customProperties.delay?.value ?? 5 * 1000,
				entityCount: 0,
				entityType: object.customProperties.entityType.value,
				frequency: object.customProperties.frequency?.value ?? 0,
				maxEntityCount: object.customProperties.maxEntityCount?.value ?? 10,
				lastSpawnAt: 0,
				spawnsOn: object.customProperties.spawnsOn.value,
			}),
		})
	}

	return null
}
