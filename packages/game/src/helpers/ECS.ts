// Module imports
import { createReactAPI } from 'miniplex-react'





// Local imports
import { store } from '@/store/store'





export const ECS = createReactAPI(store.state.world)

export const query = {
	actor: ECS.world.with('actorType', 'attack', 'bodies', 'position', 'velocity', 'zIndex'),
	npc: ECS.world.with('actorType', 'attack', 'behaviorTree', 'bodies', 'destination', 'position', 'velocity', 'zIndex'),
	sortable: ECS.world.with('position', 'zIndex', 'zOffset'),
	spawn: ECS.world.with('position', 'spawn'),
	tile: ECS.world.with('position', 'tile', 'zIndex'),
}
