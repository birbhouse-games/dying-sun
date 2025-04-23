// Module imports
import { Engine } from 'matter-js'
import { Ticker } from 'pixi.js'





// Local imports
import { PhysicsEngine } from '@/store/traits'
import { type SystemRunner } from '@/typedefs/SystemRunner'
import { world } from '@/store/world'





/**
 * Updates the physics engine.
 *
 * @param ticker The Pixi.js ticker.
 */
export const physicsSystem: SystemRunner = function physicsSystem(ticker: Ticker) {
	const { deltaMS } = ticker
	const physicsEngine = world.get(PhysicsEngine)!

	Engine.update(physicsEngine, deltaMS)
}
