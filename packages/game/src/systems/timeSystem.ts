// Local imports
import { type SystemRunner } from '@/typedefs/SystemRunner'
import { Time } from '@/store/traits'
import { world } from '@/store/world'





/** Updates the global state with the time at the beginning of each frame. */
export const timeSystem: SystemRunner = function timeSystem() {
	const time = world.get(Time)!

	if (time.now === 0) {
		time.now = performance.now()
	}

	const now = performance.now()
	time.deltaTime = now - time.now
	time.now = now

	world.set(Time, time)
}
