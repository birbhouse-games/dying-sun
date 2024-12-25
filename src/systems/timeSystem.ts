// Local imports
import { Time } from '@/store/traits'
import { world } from '@/store/world'





/** Updates the global state with the time at the beginning of each frame. */
export function timeSystem() {
	const time = world.get(Time)

	if (time.now === 0) {
		time.now = performance.now()
	}

	const now = performance.now()
	time.deltaTime = now - time.now
	time.now = now

	world.set(Time, time)
}
