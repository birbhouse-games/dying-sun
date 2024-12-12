// Module imports
import {
	Engine,
	Runner,
} from 'matter-js'
import { Ticker } from 'pixi.js'





// Local imports
import { store } from '@/store/store'





export function physicsSystem(ticker: Ticker) {
	const { deltaMS } = ticker
	const { physicsEngine } = store.state

	Engine.update(physicsEngine, deltaMS)
}
