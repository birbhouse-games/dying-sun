// Module imports
import { makeStore } from 'statery'





// Local imports
import { type GlobalState } from '../typedefs/GlobalState'
import { initialState } from './initialState'





export const store = makeStore<GlobalState>(initialState)
