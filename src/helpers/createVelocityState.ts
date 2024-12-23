// Module imports
import { makeStore } from 'statery'





// Local imports
import { type VelocityState } from '@/typedefs/VelocityState'





/**
 * Creates a new velocity state.
 *
 * @param initialX The initial x velocity.
 * @param initialY The initial y velocity.
 * @returns The velocity state.
 */
export function createVelocityState(
	initialX: VelocityState['x'],
	initialY: VelocityState['y'],
) {
	return makeStore<VelocityState>({
		x: initialX,
		y: initialY,
	})
}
