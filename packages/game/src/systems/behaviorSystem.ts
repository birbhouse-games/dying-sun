// Local imports
import { Behavior } from '@/store/traits'
import { world } from '@/store/world'





/** Moves actor sprites based on their physics body's position. */
export function behaviorSystem() {
	world.query(Behavior).updateEach(([behaviorTree]) => {
		behaviorTree.step()
	})
}
