// Local imports
import {
	Attacker,
	Time,
} from '@/store/traits'
import { world } from '@/store/world'





/** Moves physics bodies based on their owner entity's velocity. */
export function attackSystem() {
	const { now } = world.get(Time)!

	world.query(Attacker).updateEach(([attacker]) => {
		const {
			continueCombo,
			currentStageIndex,
			stages,
			startedAt,
		} = attacker

		if ((currentStageIndex === null) || (startedAt === null)) {
			return
		}

		const currentStage = stages?.[currentStageIndex!]

		if (!currentStage) {
			return
		}

		const animationEndsAt = startedAt + currentStage.duration

		if (now < animationEndsAt) {
			return
		}

		if (continueCombo) {
			attacker.continueCombo = false
			attacker.currentStageIndex = currentStageIndex + 1
			attacker.startedAt = now
		} else {
			attacker.continueCombo = null
			attacker.currentStageIndex = null
			attacker.stages = null
			attacker.startedAt = null
		}
	}, { changeDetection: true })
}
