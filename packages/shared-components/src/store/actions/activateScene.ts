// Local imports
import { SceneKey } from '../../typedefs/SceneKey'
import { store } from '../store'





/**
 * Adds a toast to be displayed by the ToastManager.
 *
 * @param key The key of the scene to be activated.
 */
export function activateScene(key: SceneKey) {
	store.set({ currentScene: key })
}
