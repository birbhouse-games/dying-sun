// Module imports
import {
	FAILURE,
	RUNNING,
	SUCCESS,
	Task,
} from 'behaviortree'





// Local imports
import { isEntityNearDestination } from '@/helpers/isEntityNearDestination'
import { type NPCType } from '@/typedefs/NPCType'





// Types
type MoveToBlackboard = {
	entity: NPCType,
}





export const MoveToTask = new Task({
	/**
	 * Stops the entity's movement when the movement is complete.
	 *
	 * @param blackboard The behavior tree's data store.
	 */
	end(blackboard: MoveToBlackboard) {
		const { entity } = blackboard

		entity.destination.set(() => ({ value: null }))
		entity.velocity.set(() => ({
			x: 0,
			y: 0,
		}))
	},

	/**
	 * Keeps the entity moving towards its destination.
	 *
	 * @param blackboard The behavior tree's data store.
	 * @returns The status of the task.
	 */
	run(blackboard: MoveToBlackboard) {
		const { entity } = blackboard

		if (!entity.destination.state.value) {
			return FAILURE
		}

		if (isEntityNearDestination(entity)) {
			return SUCCESS
		}

		const {
			x: entityX,
			y: entityY,
		} = entity.position.state
		const {
			x: destinationX,
			y: destinationY,
		} = entity.destination.state.value

		const dx = destinationX - entityX
		const dy = destinationY - entityY

		const magnitude = Math.sqrt((dx ** 2) + (dy ** 2))

		entity.velocity.set(() => ({
			x: (dx / magnitude) * entity.speed,
			y: (dy / magnitude) * entity.speed,
		}))

		return RUNNING
	},
})
