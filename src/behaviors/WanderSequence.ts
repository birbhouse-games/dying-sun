// Module imports
import { Sequence } from 'behaviortree'





// Local imports
import { ChooseLocationTask } from '@/behaviors/ChooseLocationTask'
import { IdleTask } from '@/behaviors/IdleTask'
import { MoveToTask } from '@/behaviors/MoveToTask'





export const WanderSequence = new Sequence({
	nodes: [
		IdleTask,
		ChooseLocationTask,
		MoveToTask,
	],
})
