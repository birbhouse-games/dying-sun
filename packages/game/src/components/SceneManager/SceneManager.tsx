// Module imports
import {
	type PropsWithChildren,
	useCallback,
	useMemo,
	useState,
} from 'react'
import { AnimatePresence } from 'motion/react'





// Local imports
import { INITIAL_STATE } from './initialState'
import { SceneManagerContext } from './SceneManagerContext'





// Types
type Props = PropsWithChildren





/**
 * Wraps a scene.
 *
 * @type {React.FunctionComponent}
 */
export function SceneManager(props: Props) {
	const {
		children,
	} = props

	const [currentScene, setCurrentScene] = useState(INITIAL_STATE.currentScene)

	const activateScene = useCallback((sceneName: string) => {
		setCurrentScene(sceneName)
	}, [])

	const providerValue = useMemo(() => {
		return {
			activateScene,
			currentScene,
		}
	}, [
		activateScene,
		currentScene,
	])

	return (
		<SceneManagerContext.Provider value={providerValue}>
			<AnimatePresence initial={false}>
				{children}
			</AnimatePresence>
		</SceneManagerContext.Provider>
	)
}
