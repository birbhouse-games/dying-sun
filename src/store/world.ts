// Module imports
import { createWorld } from 'koota'





// Local imports
import {
	AssetRegistry,
	PhysicsEngine,
	Time,
} from './traits'





export const world = createWorld(AssetRegistry, Time, PhysicsEngine)
