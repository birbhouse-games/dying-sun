// Module imports
import { Engine } from 'matter-js'
import { Ticker } from 'pixi.js'





// Local imports
import { store } from '@/store/store'





/**
 * Updates the physics engine.
 *
 * @param ticker The Pixi.js ticker.
 */
export function physicsSystem(ticker: Ticker) {
	const { deltaMS } = ticker
	const { physicsEngine } = store.state

	Engine.update(physicsEngine, deltaMS)
}
