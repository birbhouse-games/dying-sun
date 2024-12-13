/* eslint-disable jsdoc/require-jsdoc */

// Local imports
import { ACTION_NAMES } from '@/constants/ACTION_NAMES.ts'
import { type ActionHandler } from '@/typedefs/ActionHandler.ts'
import { ECS } from '@/helpers/ECS'





// Constants
const PLAYER_ENTITIES = ECS.world.with(
	'isPlayer',
	'velocity',
)





export const ACTION_HANDLERS: Record<string, ActionHandler> = {
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
