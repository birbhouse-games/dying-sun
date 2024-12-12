// Local imports
import { store } from '@/store/store.ts'





export function timeSystem() {
	store.set(() => ({ now: performance.now() }))
}
