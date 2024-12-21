// Module imports
import {
	Bodies,
	Composite,
} from 'matter-js'
import { makeStore } from 'statery'





// Local imports
import { createAttackState } from '@/helpers/createAttackState'
import { DEFAULT_BODY_OPTIONS } from '@/constants/DEFAULT_BODY_OPTIONS'
import { ECS } from '@/helpers/ECS'
import { type EntityDefinition } from '@/typedefs/EntityDefinition'
import { store } from '@/store/store'





/**
 * Creates the Miniplex entity and Matter.js bodies for a player.
 *
 * @param entityDefinition The definition of the entity from the entity catalogue.
 * @param startingX The X position at which this entity will start.
 * @param startingY The Y position at which this entity will start.
 * @param entityProps Additional props to be set on the body.
 * @returns The new entity.
 */
export function createActorEntity(
	entityDefinition: EntityDefinition,
	startingX: number,
	startingY: number,
	entityProps = {},
) {
	const { physicsEngine } = store.state

	const entity = ECS.world.add({
		...entityProps,
		actorType: entityDefinition.actorType,
		attack: createAttackState(),
		bodies: Composite.create(),
		health: makeStore({ value: entityDefinition.health }),
		speed: entityDefinition.speed,
		position: makeStore({
			x: startingX,
			y: startingY,
		}),
		velocity: makeStore({
			x: 0,
			y: 0,
		}),
		zIndex: makeStore({ value: 0 }),
		zOffset: entityDefinition.zOffset,
	})

	entityDefinition.colliders.forEach(colliderDefinition => {
		const colliderOptions = {
			...DEFAULT_BODY_OPTIONS,
			collisionFilter: {
				category: colliderDefinition.collisionCategory,
				mask: colliderDefinition.collisionMask,
			},
			label: 'collider',
			render: (colliderDefinition.render ?? {}),
		}

		if (colliderDefinition.render) {
			colliderOptions.render = colliderDefinition.render
		}

		const collider = Bodies.rectangle(
			startingX + colliderDefinition.x,
			startingY + colliderDefinition.y,
			colliderDefinition.width,
			colliderDefinition.height,
			colliderOptions,
		)

		Composite.add(entity.bodies!, collider)
	})

	Composite.add(physicsEngine.world, entity.bodies!)

	return entity
}
