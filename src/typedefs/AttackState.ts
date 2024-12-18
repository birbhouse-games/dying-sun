interface AttackStage {
	/** @description The duration of the stage (in milliseconds). */
	duration: number,

	/** @description The bounding box within which attackable entities will take damage. */
	hitBoxes: Array<{
		height: number,
		width: number,
		x: number,
		y: number,
	}>,

	/** @description The name of the animation to be played. */
	name: string,
}

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
