// Local imports
import { ACTION_HANDLERS } from '@/constants/ACTION_HANDLERS'
import { KEY_BINDINGS } from '@/constants/KEY_BINDINGS.ts'
import { store } from '@/store/store.ts'





/** Updates the state of input controls based on the current keyboard/gamepad state. */
export function controlsSystem() {
	const boundKeys = Object.keys(KEY_BINDINGS)

	const {
		keyboardState,
		now,
	} = store.state

	for (const key of boundKeys) {
		if (keyboardState.has(key)) {
			const keyState = keyboardState.get(key)
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
