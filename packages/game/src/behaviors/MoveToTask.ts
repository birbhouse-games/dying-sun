// Module imports
import {
	FAILURE,
	RUNNING,
	SUCCESS,
	Task,
} from 'behaviortree'





// Local imports
import {
	Actor,
	Destination,
	Position,
	Velocity,
} from '@/store/traits'
import { Entity } from 'koota'
import { isEntityNearDestination } from '@/helpers/isEntityNearDestination'





// Types
type MoveToBlackboard = {
	entity: Entity,
}





export const MoveToTask = new Task({
	/**
	 * Stops the entity's movement when the movement is complete.
	 *
	 * @param blackboard The behavior tree's data store.
	 */
	end(blackboard: MoveToBlackboard) {
		const { entity } = blackboard

		entity.remove(Destination)
		entity.set(Velocity, {
			x: 0,
			y: 0,
		})
	},

	/**
	 * Keeps the entity moving towards its destination.
	 *
	 * @param blackboard The behavior tree's data store.
	 * @returns The status of the task.
	 */
	run(blackboard: MoveToBlackboard) {
		const { entity } = blackboard

		if (!entity.has(Destination)) {
			return FAILURE
		}

		if (isEntityNearDestination(entity)) {
			return SUCCESS
		}

		const {
			x: entityX,
			y: entityY,
		} = entity.get(Position)!
		const {
			x: destinationX,
			y: destinationY,
		} = entity.get(Destination)!

		const dx = destinationX - entityX
		const dy = destinationY - entityY

		const magnitude = Math.sqrt((dx ** 2) + (dy ** 2))
		const { speed } = entity.get(Actor)!

		entity.set(Velocity, {
			x: (dx / magnitude) * speed,
			y: (dy / magnitude) * speed,
		})

		return RUNNING
	},
})
