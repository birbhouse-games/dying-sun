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
	'attack',
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
				} = entity.attack.state
				const currentStage = stages?.[currentStageIndex!]

				// Starting a new attack combo
				if (startedAt === null) {
					entity.attack.set(() => ({
						continueCombo: false,
						currentStageIndex: 0,
						stages: [
							{
								duration: FRAME_DURATION * 7,
								hitBoxes: [{
									height: 25,
									width: 25,
									x: -5,
									y: -19,
								}],
								name: 'attack-1',
							},
							{
								duration: FRAME_DURATION * 5,
								hitBoxes: [{
									height: 22,
									width: 37,
									x: -18,
									y: -16,
								}],
								name: 'attack-2',
							},
							{
								duration: FRAME_DURATION * 5,
								hitBoxes: [{
									height: 23,
									width: 40,
									x: -14,
									y: -17,
								}],
								name: 'attack-3',
							},
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
					entity.attack.set(() => ({ continueCombo: true }))
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
