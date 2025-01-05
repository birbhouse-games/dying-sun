/* eslint-disable jsdoc/require-jsdoc */

// Local imports
import {
	Actor,
	Attacker,
	Time,
	Velocity,
} from '@/store/traits'
import { ACTION_NAMES } from '@/constants/ACTION_NAMES.ts'
import { type ActionHandler } from '@/typedefs/ActionHandler.ts'
import { COMBO_CONTINUE_WINDOW } from '@/constants/COMBO_CONTINUE_WINDOW'
import { world } from '@/store/world'





// Constants
const FRAME_DURATION = 100





export const ACTION_HANDLERS: Record<string, ActionHandler> = {
	[ACTION_NAMES.BASIC_ATTACK]: {
		isRepeatable: false,
		onActivate() {
			const { now } = world.get(Time)!

			world.query(Actor, Attacker).updateEach(([{ actorType }, attacker]) => {
				if (actorType !== 'hero') {
					return
				}

				const {
					continueCombo,
					currentStageIndex,
					stages,
					startedAt,
				} = attacker

				const currentStage = stages?.[currentStageIndex!]

				// Starting a new attack combo
				if (startedAt === null) {
					attacker.startedAt = now
					attacker.continueCombo = false
					attacker.currentStageIndex = 0
					attacker.stages = [
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
					]
				} else if (
					currentStage !== null
					&& continueCombo !== true
					&& currentStageIndex! < (stages!.length - 1)
					&& now <= ((startedAt + currentStage!.duration) + COMBO_CONTINUE_WINDOW)
					&& now >= ((startedAt + currentStage!.duration) - COMBO_CONTINUE_WINDOW)
				) {
					attacker.continueCombo = true
				}
			})
		},
	},

	[ACTION_NAMES.MOVE_EAST]: {
		isRepeatable: false,
		onActivate() {
			world.query(Actor, Velocity).updateEach(([actor, velocity]) => {
				if (actor.actorType !== 'hero') {
					return
				}

				velocity.x += 1
			})
		},
		onDeactivate() {
			world.query(Actor, Velocity).updateEach(([actor, velocity]) => {
				if (actor.actorType !== 'hero') {
					return
				}

				velocity.x -= 1
			})
		},
	},

	[ACTION_NAMES.MOVE_NORTH]: {
		isRepeatable: false,
		onActivate() {
			world.query(Actor, Velocity).updateEach(([actor, velocity]) => {
				if (actor.actorType !== 'hero') {
					return
				}

				velocity.y -= 1
			})
		},
		onDeactivate() {
			world.query(Actor, Velocity).updateEach(([actor, velocity]) => {
				if (actor.actorType !== 'hero') {
					return
				}

				velocity.y += 1
			})
		},
	},

	[ACTION_NAMES.MOVE_SOUTH]: {
		isRepeatable: false,
		onActivate() {
			world.query(Actor, Velocity).updateEach(([actor, velocity]) => {
				if (actor.actorType !== 'hero') {
					return
				}

				velocity.y += 1
			})
		},
		onDeactivate() {
			world.query(Actor, Velocity).updateEach(([actor, velocity]) => {
				if (actor.actorType !== 'hero') {
					return
				}

				velocity.y -= 1
			})
		},
	},

	[ACTION_NAMES.MOVE_WEST]: {
		isRepeatable: false,
		onActivate() {
			world.query(Actor, Velocity).updateEach(([actor, velocity]) => {
				if (actor.actorType !== 'hero') {
					return
				}

				velocity.x -= 1
			})
		},
		onDeactivate() {
			world.query(Actor, Velocity).updateEach(([actor, velocity]) => {
				if (actor.actorType !== 'hero') {
					return
				}

				velocity.x += 1
			})
		},
	},
}