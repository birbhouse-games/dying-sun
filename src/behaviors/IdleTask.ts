// Module imports
import {
	RUNNING,
	SUCCESS,
	Task,
} from 'behaviortree'





// Local imports
import { type NPCType } from '@/typedefs/NPCType'
import { store } from '@/store/store'





// Types
interface IdleBlackboard {
	entity: NPCType,
	idleDuration?: number,
	idleStartedAt?: number,
}





export const IdleTask = new Task({
	/**
	 * Delete unnecessary data from the blackboard when idling is complete.
	 *
	 * @param blackboard The behavior tree's data store.
	 */
	end(blackboard: IdleBlackboard) {
		delete blackboard.idleDuration
		delete blackboard.idleStartedAt
	},

	/**
	 * End the idle if the duration has completed.
	 *
	 * @param blackboard The behavior tree's data store.
	 * @returns The status of the task.
	 */
	run(blackboard: IdleBlackboard) {
		if (store.state.now >= (blackboard.idleStartedAt! + blackboard.idleDuration!)) {
			return SUCCESS
		}

		return RUNNING
	},

	/**
	 * Generates a random idle duration and sets required values for the idle.
	 *
	 * @param blackboard The behavior tree's data store.
	 */
	start(blackboard: IdleBlackboard) {
		const {
			max: maxIdle,
			min: minIdle,
		} = blackboard.entity.idle!

		blackboard.idleDuration = minIdle + ((maxIdle - minIdle) * Math.random())
		blackboard.idleStartedAt = store.state.now
	},
})
