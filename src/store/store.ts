// Module imports
import { makeStore } from 'statery'





// Local imports
import { initialState } from '@/store/initialState.ts'





export const store = makeStore(initialState)

if (typeof window !== 'undefined') {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window.store = store
}
