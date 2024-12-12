// Module imports
import { Graphics } from 'pixi.js'
import { useCallback } from 'react'





export function useGraphics(
	callback: (graphics: Graphics, ...args: unknown[]) => unknown,
	dependencies: unknown[],
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, dependencies)
}
