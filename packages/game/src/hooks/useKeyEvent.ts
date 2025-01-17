// Module imports
import {
	useCallback,
	useMemo,
} from 'react'





// Local imports
import { useWindowEventHandler } from '@/hooks/useWindowEventHandler'





/**
 * Fires a callback on keydown events for a certain key.
 *
 * @param keyState Whether to fire on key up, key down, or key press.
 * @param callback The callback to be fired when the event occurs.
 * @param keyFilter The key(s) that can activate this event.
 * @param dependencies Additional dependencies.
 */
export function useKeyEvent(
	keyState: 'down' | 'press' | 'up',
	callback: (event: KeyboardEvent) => void,
	keyFilter?: string | string[],
	dependencies?: unknown[],
) {
	const keysArray = useMemo(() => {
		if (!keyFilter) {
			return null
		}

		if (Array.isArray(keyFilter)) {
			return keyFilter.map(item => item)
		}

		return [keyFilter]
	}, [keyFilter])

	const handleEvent = useCallback((event: KeyboardEvent) => {
		const eventKey = event!.key

		if ((keysArray === null) || keysArray.includes(eventKey)) {
			callback(event)
		}
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		...(dependencies ?? []),
		callback,
		keysArray,
	])

	useWindowEventHandler(`key${keyState}`, handleEvent)
}
