// Module imports
import {
	createContext,
	useContext,
} from 'react'





// Local imports
import { INITIAL_STATE } from './initialState'





// Constants
export const SceneManagerContext = createContext(INITIAL_STATE)

// eslint-disable-next-line jsdoc/require-jsdoc
export const useSceneManagerContext = () => useContext(SceneManagerContext)
