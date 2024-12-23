// Local imports
import { query } from '@/helpers/ECS'





/** Moves actor sprites based on their physics body's position. */
export function behaviorSystem() {
	for (const entity of query.npc) {
		entity.behaviorTree.step()
	}
}
