/* eslint-disable jsdoc/require-jsdoc */

// Local imports
import { ACTION_NAMES } from '@/constants/ACTION_NAMES.ts'
import { type ActionHandler } from '@/typedefs/ActionHandler.ts'
import { COMBO_CONTINUE_WINDOW } from '@/constants/COMBO_CONTINUE_WINDOW'
import { ECS } from '@/helpers/ECS'
import { store } from '@/store/store'





// Constants
const FRAME_DURATION = 100
const PLAYER_ENTITIES = ECS.world.with(
	'isAttacking',
	'isPlayer',
	'velocity',
)





export const ACTION_HANDLERS: Record<string, ActionHandler> = {
	[ACTION_NAMES.BASIC_ATTACK]: {
		isRepeatable: false,
		onActivate() {
			const { now } = store.state

			for (const entity of PLAYER_ENTITIES) {
				const {
					continueCombo,
					currentStageIndex,
					stages,
					startedAt,
				} = entity.isAttacking.state
				const currentStage = stages?.[currentStageIndex!]

				// Starting a new attack combo
				if (startedAt === null) {
					entity.isAttacking.set(() => ({
						continueCombo: false,
						currentStageIndex: 0,
						stages: [
							{ duration: FRAME_DURATION * 7 },
							{ duration: FRAME_DURATION * 5 },
							{ duration: FRAME_DURATION * 5 },
						],
						startedAt: now,
					}))
				} else if (
					currentStage !== null
					&& continueCombo !== true
					&& currentStageIndex! < (stages!.length - 1)
					&& now <= ((startedAt + currentStage!.duration) + COMBO_CONTINUE_WINDOW)
					&& now >= ((startedAt + currentStage!.duration) - COMBO_CONTINUE_WINDOW)
				) {
					entity.isAttacking.set(() => ({ continueCombo: true }))
				}
			}
		},
	},

	[ACTION_NAMES.MOVE_EAST]: {
		isRepeatable: false,
		onActivate() {
			for (const entity of PLAYER_ENTITIES) {
				entity.velocity.set(previousState => ({
					x: previousState.x + 1,
				}))
			}
		},
		onDeactivate() {
			for (const entity of PLAYER_ENTITIES) {
				entity.velocity.set(previousState => ({
					x: previousState.x - 1,
				}))
			}
		},
	},

	[ACTION_NAMES.MOVE_NORTH]: {
		isRepeatable: false,
		onActivate() {
			for (const entity of PLAYER_ENTITIES) {
				entity.velocity.set(previousState => ({
					y: previousState.y - 1,
				}))
			}
		},
		onDeactivate() {
			for (const entity of PLAYER_ENTITIES) {
				entity.velocity.set(previousState => ({
					y: previousState.y + 1,
				}))
			}
		},
	},

	[ACTION_NAMES.MOVE_SOUTH]: {
		isRepeatable: false,
		onActivate() {
			for (const entity of PLAYER_ENTITIES) {
				entity.velocity.set(previousState => ({
					y: previousState.y + 1,
				}))
			}
		},
		onDeactivate() {
			for (const entity of PLAYER_ENTITIES) {
				entity.velocity.set(previousState => ({
					y: previousState.y - 1,
				}))
			}
		},
	},

	[ACTION_NAMES.MOVE_WEST]: {
		isRepeatable: false,
		onActivate() {
			for (const entity of PLAYER_ENTITIES) {
				entity.velocity.set(previousState => ({
					x: previousState.x - 1,
				}))
			}
		},
		onDeactivate() {
			for (const entity of PLAYER_ENTITIES) {
				entity.velocity.set(previousState => ({
					x: previousState.x + 1,
				}))
			}
		},
	},
}
