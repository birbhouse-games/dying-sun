// Module imports
import {
	RUNNING,
	SUCCESS,
	Task,
} from 'behaviortree'
import { Entity } from 'koota'





// Local imports
import {
	Idle,
	Time,
} from '@/store/traits'
import { world } from '@/store/world'





// Types
interface IdleBlackboard {
	entity: Entity,
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
		const { now } = world.get(Time)!
		if (now >= (blackboard.idleStartedAt! + blackboard.idleDuration!)) {
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
		} = blackboard.entity.get(Idle)!

		blackboard.idleDuration = Math.round(minIdle + ((maxIdle - minIdle) * Math.random()))
		blackboard.idleStartedAt = world.get(Time)!.now
	},
})
