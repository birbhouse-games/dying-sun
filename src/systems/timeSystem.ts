// Local imports
import { store } from '@/store/store.ts'





/** Updates the global state with the time at the beginning of each frame. */
export function timeSystem() {
	store.set(() => ({ now: performance.now() }))
}
