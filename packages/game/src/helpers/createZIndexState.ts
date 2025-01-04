// Module imports
import { makeStore } from 'statery'





// Local imports
import { type ZIndexState } from '@/typedefs/ZIndexState'





/**
 * Creates a new z index state.
 *
 * @param initialValue The initial z index.
 * @returns The z index state.
 */
export function createZIndexState(initialValue: ZIndexState['value']) {
	return makeStore<ZIndexState>({ value: initialValue })
}
