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





export const AcquireTargetTask = new Task({
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
})
