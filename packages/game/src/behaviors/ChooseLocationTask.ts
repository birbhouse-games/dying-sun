// Module imports
import {
	SUCCESS,
	Task,
} from 'behaviortree'





// Local imports
import { Destination } from '@/store/traits'
import { Entity } from 'koota'
import { Vector2 } from '@/typedefs/Vector2'





// Types
type ChooseLocationBlackboard = {
	destination?: Vector2,
	entity: Entity,
	home: Vector2,
	wanderRadius: number,
}





export const ChooseLocationTask = new Task({
	/**
	 * Chooses a random location within the wander radius of the entity.
	 *
	 * @param blackboard The behavior tree's data store.
	 * @returns The status of the task.
	 */
	run(blackboard: ChooseLocationBlackboard) {
		const {
			entity,
			home,
			wanderRadius,
		} = blackboard

		const xDirection = Math.random() > 0.5 ? 1 : -1
		const yDirection = Math.random() > 0.5 ? 1 : -1

		entity.add(Destination)
		entity.set(Destination, {
			x: Math.round(((Math.random() * wanderRadius) * xDirection) + home.x),
			y: Math.round(((Math.random() * wanderRadius) * yDirection) + home.y),
		})

		return SUCCESS
	},
})
