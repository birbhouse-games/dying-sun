// Module imports
import { makeStore } from 'statery'





// Local imports
import { type AttackState } from '@/typedefs/AttackState'





/**
 * Creates a new attack state.
 *
 * @returns The attack state.
 */
export function createAttackState() {
	return makeStore<AttackState>({
		continueCombo: null,
		currentStageIndex: null,
		stages: null,
		startedAt: null,
	})
}
