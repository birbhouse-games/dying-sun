// Module imports
import {
	SUCCESS,
	Task,
} from 'behaviortree'





// Local imports
import { ActorType } from '@/typedefs/ActorType'
import { Vector2 } from '@/typedefs/Vector2'





// Types
type ChooseLocationBlackboard = {
	destination?: Vector2,
	entity: ActorType,
	home: Vector2,
	wanderRadius: number,
}





export const ChooseLocationTask = new Task({
	// (optional) this function is called directly before the run method
	// is called. It allows you to setup things before starting to run
	// start: function (blackboard) {
	// 	blackboard.isStarted = true
	// },

	// (optional) this function is called directly after the run method
	// is completed with either this.success() or this.fail(). It allows you to clean up
	// things, after you run the task.
	// end: function (blackboard) {
	// 	blackboard.isStarted = false
	// },

	/**
	 * The core of the task.
	 *
	 * @param blackboard The behavior tree's data store.
	 * @returns The status of the task.
	 */
	run: (blackboard: ChooseLocationBlackboard) => {
		const {
			entity,
			home,
			wanderRadius,
		} = blackboard

		const xDirection = Math.random() > 0.5 ? 1 : -1
		const yDirection = Math.random() > 0.5 ? 1 : -1

		entity.destination!.set(() => ({
			value: {
				x: ((Math.random() * wanderRadius) * xDirection) + home.x,
				y: ((Math.random() * wanderRadius) * yDirection) + home.y,
			},
		}))

		return SUCCESS
	},
})
