// Local imports
import { Behavior } from '@/store/traits'
import { type SystemRunner } from '@/typedefs/SystemRunner'
import { world } from '@/store/world'





/** Moves actor sprites based on their physics body's position. */
export const behaviorSystem: SystemRunner = function behaviorSystem() {
	world.query(Behavior).updateEach(([behaviorTree]) => {
		behaviorTree.step()
	})
}
