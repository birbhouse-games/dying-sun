// Module imports
import { createReactAPI } from 'miniplex-react'





// Local imports
import { store } from '@/store/store'





export const ECS = createReactAPI(store.state.world)

export const query = {
	actor: ECS.world.with('attack', 'bodies', 'isActor', 'position'),
	player: ECS.world.with('attack', 'bodies', 'isPlayer', 'position', 'velocity', 'zIndex'),
	sortable: ECS.world.with('position', 'zIndex', 'zOffset'),
	tile: ECS.world.with('position', 'tile', 'zIndex'),
}
