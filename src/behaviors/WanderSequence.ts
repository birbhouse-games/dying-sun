// Module imports
import { Sequence } from 'behaviortree'





// Local imports
import { ChooseLocationTask } from '@/behaviors/ChooseLocationTask'
import { MoveToTask } from '@/behaviors/MoveToTask'





export const WanderSequence = new Sequence({
	nodes: [
		ChooseLocationTask,
		MoveToTask,
	],
})
