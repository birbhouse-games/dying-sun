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



// export function attackSystem() {
// 	const { now } = store.state

// 	for (const entity of query.actor) {
// 		const {
// 			continueCombo,
// 			currentStageIndex,
// 			stages,
// 			startedAt,
// 		} = entity.attack.state

// 		if ((currentStageIndex === null) || (startedAt === null)) {
// 			continue
// 		}

// 		const currentStage = stages?.[currentStageIndex!]

// 		if (!currentStage) {
// 			continue
// 		}

// 		const animationEndsAt = startedAt + currentStage.duration

// 		if (now < animationEndsAt) {
// 			continue
// 		}

// 		if (continueCombo) {
// 			entity.attack.set(previousState => ({
// 				continueCombo: false,
// 				currentStageIndex: previousState.currentStageIndex! + 1,
// 				startedAt: now,
// 			}))
// 		} else {
// 			entity.attack.set(() => ({
// 				continueCombo: null,
// 				currentStageIndex: null,
// 				stages: null,
// 				startedAt: null,
// 			}))
// 		}
// 	}
// }
