// Module imports
import { makeStore } from 'statery'





// Local imports
import { type IsAttackingState } from '@/typedefs/IsAttackingState'





/**
 * Creates a new attack state.
 *
 * @returns The attack state.
 */
export function createIsAttackingState() {
	return makeStore<IsAttackingState>({
		continueCombo: null,
		currentStageIndex: null,
		stages: null,
		startedAt: null,
	})
}
