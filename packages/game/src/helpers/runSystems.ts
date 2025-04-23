// Module imports
import { Ticker } from 'pixi.js'





// Local imports
import { actorSystem } from '@/systems/actorSystem'
import { attackSystem } from '@/systems/attackSystem'
import { audioSystem } from '@/systems/audioSystem'
import { behaviorSystem } from '@/systems/behaviorSystem'
import { cameraSystem } from '@/systems/cameraSystem'
import { controlsSystem } from '@/systems/controlsSystem'
import { entitySortSystem } from '@/systems/entitySortSystem'
import { movementSystem } from '@/systems/movementSystem'
import { PerformanceStats } from '@/store/traits/PerformanceStats'
import { physicsSystem } from '@/systems/physicsSystem'
import { spawnSystem } from '@/systems/spawnSystem'
import { type SystemRunner } from '@/typedefs/SystemRunner'
import { timeSystem } from '@/systems/timeSystem'
import { world } from '@/store/world'





// Constants
const SYSTEMS: Array<[string, SystemRunner]> = [
	['spawn', spawnSystem],
	['time', timeSystem],
	['spawn', spawnSystem],
	['controls', controlsSystem],
	['behavior', behaviorSystem],
	['movement', movementSystem],
	['attack', attackSystem],
	['physics', physicsSystem],
	['actor', actorSystem],
	['entity sort', entitySortSystem],
	['camera', cameraSystem],
	['audio', audioSystem],
]





/**
 * Runs each system in order.
 *
 * @param ticker The Pixi.js ticker.
 */
export function runSystems(ticker: Ticker) {
	const stats = world.get(PerformanceStats)!

	for (const [systemName, systemRunner] of SYSTEMS) {
		stats.begin(systemName)
		systemRunner(ticker)
		stats.end(systemName)
	}
}
