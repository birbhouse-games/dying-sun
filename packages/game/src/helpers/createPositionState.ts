// Module imports
import { makeStore } from 'statery'





// Local imports
import { type PositionState } from '@/typedefs/PositionState'





/**
 * Creates a new position state.
 *
 * @param initialX The initial x position.
 * @param initialY The initial y position.
 * @returns The position state.
 */
export function createPositionState(
	initialX: PositionState['x'],
	initialY: PositionState['y'],
) {
	return makeStore<PositionState>({
		x: initialX,
		y: initialY,
	})
}
