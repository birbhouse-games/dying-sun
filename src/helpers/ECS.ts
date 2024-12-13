// Module imports
import { createReactAPI } from 'miniplex-react'





// Local imports
import { store } from '@/store/store'





export const ECS = createReactAPI(store.state.world)
