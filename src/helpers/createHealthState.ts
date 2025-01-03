// Module imports
import { makeStore } from 'statery'





// Local imports
import { type HealthState } from '@/typedefs/HealthState'





/**
 * Creates a new health state.
 *
 * @param initialValue The initial health.
 * @returns The health state.
 */
export function createHealthState(initialValue: HealthState['value']) {
	return makeStore<HealthState>({ value: initialValue })
}
