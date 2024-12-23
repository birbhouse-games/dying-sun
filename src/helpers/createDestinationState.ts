// Module imports
import { makeStore } from 'statery'





// Local imports
import { type DestinationState } from '@/typedefs/DestinationState'





/**
 * Creates a new destination state.
 *
 * @param initialValue The initial destination.
 * @returns The destination state.
 */
export function createDestinationState(initialValue: DestinationState['value'] = null) {
	return makeStore<DestinationState>({ value: initialValue })
}
