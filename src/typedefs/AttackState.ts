// Local imports
import { Vector2 } from '@/typedefs/Vector2'





interface AttackStage {
	/** @description The duration of the stage (in milliseconds). */
	duration: number,

	/** @description The bounding box within which attackable entities will take damage. */
	hitBoxes: Array<Vector2 & {
		height: number,
		width: number,
	}>,

	/** @description The name of the animation to be played. */
	name: string,
}

// Changed from interface to type to get around an index signature issue with TS
// https://github.com/microsoft/TypeScript/issues/15300
// I'll look to fix this in Koota and switch back to interface.
export interface AttackState {
	/** @description Whether to continue to the next attack stage. */
	continueCombo: boolean | null,

	/** @description The index of the current attack stage in the `stages` array. */
	currentStageIndex: number | null,

	/** @description Information about the current attack stages. */
	stages: Array<AttackStage> | null,

	/** @description The time (in milliseconds) when the current attack stage began. */
	startedAt: number | null,
}
