// Module imports
import {
	useCallback,
	useMemo,
} from 'react'





// Local imports
import {
	Input,
	Time,
} from '@/store/traits'
import { KEY_BINDINGS } from '@/constants/KEY_BINDINGS.ts'
import { useKeyEvent } from '@/hooks/useKeyEvent'
import { world } from '@/store/world'





/** Tracks changes to the keyboard state. */
export function useKeyboardStateSystem() {
	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		event.preventDefault()

		const { now } = world.get(Time)!
		const input = world.get(Input)!
		let keyState = input.get(event.key)

		if (!keyState) {
			keyState = {
				activatedAt: null,
				deactivatedAt: null,
				isActive: false,
				sinceLastActivated: null,
			}
			input.set(event.key, keyState)
		}

		if (keyState.isActive) {
			return
		}

		keyState.activatedAt = now
		keyState.isActive = true

		input.set(event.key, keyState)
	}, [])

	const handleKeyUp = useCallback((event: KeyboardEvent) => {
		event.preventDefault()

		const { now } = world.get(Time)!
		const input = world.get(Input)!
		const keyState = input.get(event.key)

		if (!keyState) {
			return
		}

		keyState.deactivatedAt = now
		keyState.isActive = false

		input.set(event.key, keyState)
	}, [])

	const keyFilter = useMemo(() => Object.keys(KEY_BINDINGS), [])

	useKeyEvent('down', handleKeyDown, keyFilter)
	useKeyEvent('up', handleKeyUp, keyFilter)
}
