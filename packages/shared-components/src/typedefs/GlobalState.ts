// Local imports
import { SceneKey } from './SceneKey'
import { ToastData } from '../typedefs/ToastData'





export interface GlobalState {
	currentScene: SceneKey,
	toasts: Array<ToastData>,
}
