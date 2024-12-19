// Local imports
import { createActorEntity } from '@/helpers/createActorEntity'
import { ENTITY_CATALOGUE } from '@/constants/ENTITY_CATALOGUE'





/**
 * Creates the Miniplex entity and Matter.js bodies for a player.
 *
 * @param startingX The X position at which this entity will start.
 * @param startingY The Y position at which this entity will start.
 * @param entityProps Additional props to be set on the entity.
 * @returns The new entity.
 */
export function createPlayerEntity(
	startingX: number,
	startingY: number,
	entityProps = {},
) {
	const entityDefinition = ENTITY_CATALOGUE['player']

	const entity = createActorEntity(
		entityDefinition,
		startingX,
		startingY,
		{
			...entityProps,
			isPlayer: true,
		},
	)

	return entity
}
