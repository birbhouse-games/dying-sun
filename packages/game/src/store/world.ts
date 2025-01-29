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
import { AudioRegistry } from '@/store/traits/AudioRegistry'





export const world = createWorld(
	AssetRegistry,
	AudioRegistry,
	Time,
	PhysicsEngine,
	Viewport,
	Input,
)
