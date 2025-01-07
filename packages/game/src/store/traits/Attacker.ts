// Module imports
import { trait } from 'koota'





// Local imports
import { AttackState } from '@/typedefs/AttackState'




export const Attacker = trait<Pick<AttackState, keyof AttackState>>({
	continueCombo: null,
	currentStageIndex: null,
	stages: null,
	startedAt: null,
})
