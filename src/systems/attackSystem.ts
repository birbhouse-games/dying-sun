// Local imports
import { query } from '@/helpers/ECS'
import { store } from '@/store/store'





/** Moves physics bodies based on their owner entity's velocity. */
export function attackSystem() {
	const { now } = store.state

	for (const entity of query.actor) {
		const {
			continueCombo,
			currentStageIndex,
			stages,
			startedAt,
		} = entity.attack.state

		if ((currentStageIndex === null) || (startedAt === null)) {
			continue
		}

		const currentStage = stages?.[currentStageIndex!]

		if (!currentStage) {
			continue
		}

		const animationEndsAt = startedAt + currentStage.duration

		if (now < animationEndsAt) {
			continue
		}

		if (continueCombo) {
			entity.attack.set(previousState => ({
				continueCombo: false,
				currentStageIndex: previousState.currentStageIndex! + 1,
				startedAt: now,
			}))
		} else {
			entity.attack.set(() => ({
				continueCombo: null,
				currentStageIndex: null,
				stages: null,
				startedAt: null,
			}))
		}
	}
}
