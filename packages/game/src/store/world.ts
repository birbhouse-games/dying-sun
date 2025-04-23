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
import { CurrentUser } from '@/store/traits/CurrentUser'





export const world = createWorld(
	AssetRegistry,
	AudioRegistry,
	CurrentUser,
	Time,
	PhysicsEngine,
	Viewport,
	Input,
)
