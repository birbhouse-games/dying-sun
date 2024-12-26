/* eslint-disable jsdoc/require-jsdoc */
// Module imports
import { trait } from 'koota'





// Local imports
import { AttackState } from '@/typedefs/AttackState'




export const Attacker = trait<AttackState>({
	continueCombo: null,
	currentStageIndex: null,
	stages: null,
	startedAt: null,
})

