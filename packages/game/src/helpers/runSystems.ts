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
import { physicsSystem } from '@/systems/physicsSystem'
import { spawnSystem } from '@/systems/spawnSystem'
import { timeSystem } from '@/systems/timeSystem'





/**
 * Runs each system in order.
 *
 * @param ticker The Pixi.js ticker.
 */
export function runSystems(ticker: Ticker) {
	timeSystem()
	spawnSystem()
	controlsSystem()
	behaviorSystem()
	movementSystem()
	attackSystem()
	physicsSystem(ticker)
	actorSystem()
	entitySortSystem()
	cameraSystem()
	audioSystem()
}
