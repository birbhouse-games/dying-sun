// Module imports
import { AnimatePresence } from 'motion/react'
import { type PropsWithChildren } from 'react'





// Local imports
import { activateScene } from '../../store/actions/activateScene'





// Types
type Props = PropsWithChildren





/**
 * Wraps a scene.
 *
 * @type {React.FunctionComponent}
 */
export function SceneManager(props: Props) {
	const { children } = props

	return (
		<AnimatePresence>
			{children}
		</AnimatePresence>
	)
}

SceneManager.activateScene = activateScene
