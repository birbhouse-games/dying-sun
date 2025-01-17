// Module imports
import { useEffect } from 'react'





/**
 * Attaches an event handler to to the window.
 *
 * @param eventName The event to be handled.
 * @param callback The callback to be fired when the event occurs.
 * @param dependencies Additional dependencies.
 */
export function useWindowEventHandler<EventKey extends keyof WindowEventMap>(
	eventName: EventKey,
	callback: (event: WindowEventMap[EventKey]) => unknown,
	dependencies: unknown[] = [],
) {
	useEffect(() => {
		window.addEventListener(eventName, callback)

		return () => {
			window.removeEventListener(eventName, callback)
		}
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		...dependencies,
		callback,
		eventName,
	])
}
