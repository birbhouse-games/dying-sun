// Module imports
import { Graphics } from 'pixi.js'
import { useCallback } from 'react'





/**
 * React hook for creating a properly typed Pixi.js Graphics draw callback.
 *
 * @param callback The callback to be fired when the Graphics context is ready to be redrawn.
 * @param dependencies An array of dependencies to watch.
 * @returns The typed callback.
 */
export function useGraphics(
	callback: (graphics: Graphics, ...args: unknown[]) => unknown,
	dependencies: unknown[],
) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useCallback(callback, dependencies)
}
