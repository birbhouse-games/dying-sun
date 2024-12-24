// Module imports





// Local imports
import {
	IsCamera,
	Position,
} from '@/store/traits'
import { world } from '@/store/world'





/** Moves the camera based to follow the player character. */
export function cameraSystem() {
	// Move the camera forward
	world.query(Position, IsCamera).updateEach(([position]) => {
		position.x -= 0.04
	}, { changeDetection: true })
}
