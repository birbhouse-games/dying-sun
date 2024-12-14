interface AttackStage {
	/** @description The duration of the stage (in milliseconds). */
	duration: number,
}

export interface IsAttackingState {
	/** @description Whether to continue to the next attack stage. */
	continueCombo: boolean | null,

	/** @description The index of the current attack stage in the `stages` array. */
	currentStageIndex: number | null,

	/** @description Information about the current attack stages. */
	stages: Array<AttackStage> | null,

	/** @description The time (in milliseconds) when the current attack stage began. */
	startedAt: number | null,
}
