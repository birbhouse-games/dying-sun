// Module imports
import {
	useCallback,
	useEffect,
} from 'react'





// Local imports
import { KEY_BINDINGS } from '@/constants/KEY_BINDINGS.ts'
import { store } from '@/store/store.ts'





/** Tracks changes to the keyboard state. */
export function useKeyboardStateSystem() {
	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		if (!KEY_BINDINGS[event.key]) {
			return
		}

		event.preventDefault()

		const { keyboardState } = store.state
		let keyState = keyboardState.get(event.key)

		if (!keyState) {
			keyState = {
				activatedAt: null,
				deactivatedAt: null,
				isActive: false,
				sinceLastActivated: null,
			}
			keyboardState.set(event.key, keyState)
		}

		if (keyState.isActive) {
			return
		}

		keyState.activatedAt = store.state.now
		keyState.isActive = true

		store.set(() => ({ keyboardState: new Map(keyboardState) }))
	}, [])

	const handleKeyUp = useCallback((event: KeyboardEvent) => {
		if (!KEY_BINDINGS[event.key]) {
			return
		}

		event.preventDefault()

		const { keyboardState } = store.state
		const keyState = keyboardState.get(event.key)

		if (!keyState) {
			return
		}

		keyState.deactivatedAt = store.state.now
		keyState.isActive = false

		store.set(() => ({ keyboardState: new Map(keyboardState) }))
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('keyup', handleKeyUp)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('keyup', handleKeyUp)
		}
	}, [
		handleKeyDown,
		handleKeyUp,
	])
}
