// Module imports
import {
	FAILURE,
	RUNNING,
	SUCCESS,
	Task,
} from 'behaviortree'





// Local imports
import { type NPCType } from '@/typedefs/NPCType'





// Types
type MoveToBlackboard = {
	entity: NPCType,
}





export const MoveToTask = new Task({
	/**
	 * The core of the task.
	 *
	 * @param blackboard The behavior tree's data store.
	 */
	end: (blackboard: MoveToBlackboard) => {
		const { entity } = blackboard

		entity.destination.set(() => ({ value: null }))
		entity.velocity.set(() => ({
			x: 0,
			y: 0,
		}))
	},

	/**
	 * The core of the task.
	 *
	 * @param blackboard The behavior tree's data store.
	 * @returns The status of the task.
	 */
	run: (blackboard: MoveToBlackboard) => {
		const { entity } = blackboard

		if (!entity.destination.state.value) {
			return FAILURE
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

		if (magnitude === 0) {
			entity.destination.set(() => ({ value: null }))
			entity.velocity.set(() => ({
				x: 0,
				y: 0,
			}))
			return SUCCESS
		}

		entity.velocity.set(() => ({
			x: (dx / magnitude) * entity.speed,
			y: (dy / magnitude) * entity.speed,
		}))

		return RUNNING
	},
})
