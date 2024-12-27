// Local imports
import {
	Input,
	Time,
} from '@/store/traits'
import { ACTION_HANDLERS } from '@/constants/ACTION_HANDLERS'
import { KEY_BINDINGS } from '@/constants/KEY_BINDINGS.ts'
import { world } from '@/store/world'





/** Updates the state of input controls based on the current keyboard/gamepad state. */
export function controlsSystem() {
	const boundKeys = Object.keys(KEY_BINDINGS)
	const { now } = world.get(Time)!
	const input = world.get(Input)!

	for (const key of boundKeys) {
		if (input.has(key)) {
			const keyState = input.get(key)
			const actionName = KEY_BINDINGS[key]
			const action = ACTION_HANDLERS[actionName]

			if (!keyState) {
				return
			}

			if (keyState.isActive) {
				if ((keyState.sinceLastActivated === null) || (action.isRepeatable && keyState.sinceLastActivated < (action.repeatFrequency ?? 0))) {
					keyState.sinceLastActivated = now
					action?.onActivate?.()
				}
			} else if (typeof keyState.sinceLastActivated === 'number') {
				keyState.sinceLastActivated = null
				action?.onDeactivate?.()
			}
		}
	}
}
