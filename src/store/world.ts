// Module imports
import { createWorld } from 'koota'





// Local imports
import {
	AssetRegistry,
	Input,
	PhysicsEngine,
	Time,
	Viewport,
} from './traits'





export const world = createWorld(AssetRegistry, Time, PhysicsEngine, Viewport, Input)
