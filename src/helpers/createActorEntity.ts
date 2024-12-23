// Module imports
import {
	Bodies,
	Composite,
} from 'matter-js'
import { BehaviorTree } from 'behaviortree'





// Local imports
import { createAttackState } from '@/helpers/createAttackState'
import { createDestinationState } from '@/helpers/createDestinationState'
import { createHealthState } from '@/helpers/createHealthState'
import { createPositionState } from '@/helpers/createPositionState'
import { createVelocityState } from '@/helpers/createVelocityState'
import { createZIndexState } from '@/helpers/createZIndexState'
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
 * @returns The new entity.
 */
export function createActorEntity(
	entityDefinition: EntityDefinition,
	startingX: number,
	startingY: number,
) {
	const { physicsEngine } = store.state

	const entity = ECS.world.add({
		actorType: entityDefinition.actorType,
		attack: createAttackState(),
		bodies: Composite.create(),
		destination: createDestinationState(),
		health: createHealthState(entityDefinition.health),
		speed: entityDefinition.speed,
		position: createPositionState(startingX, startingY),
		velocity: createVelocityState(0, 0),
		zIndex: createZIndexState(0),
		zOffset: entityDefinition.zOffset,
	})

	if (entityDefinition.behaviorTree) {
		entity.behaviorTree = new BehaviorTree({
			tree: entityDefinition.behaviorTree,
			blackboard: {
				entity,
				home: {
					x: startingX,
					y: startingY,
				},
				wanderRadius: 10,
			},
		})
	}

	if (entityDefinition.idle) {
		entity.idle = entityDefinition.idle
	}

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
