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
import { PerformanceStats } from '@/store/traits/PerformanceStats'





export const world = createWorld(
	AssetRegistry,
	AudioRegistry,
	CurrentUser,
	Time,
	PerformanceStats,
	PhysicsEngine,
	Viewport,
	Input,
)
