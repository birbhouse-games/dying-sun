// Module imports
import {
	useApplication,
	useTick,
} from '@pixi/react'
import { initDevtools } from '@pixi/devtools'
import { useActions, useWorld } from 'koota/react'
import { useEffect } from 'react'





// Local imports
import { actions } from '@/helpers/actions'
import { Renderer } from '@/components/Renderer/Renderer'
import { runSystems } from '@/helpers/runSystems'
import { useKeyboardStateSystem } from '@/hooks/useKeyboardStateSystem'
import { Viewport } from '@/store/traits'




/**
 * Main game component. owns the renderer and runs all systems.
 *
 * @component
 */
export function Game() {
	const { app } = useApplication()
	const { createCamera } = useActions(actions)
	const world = useWorld()

	useEffect(() => {
		app.stage.updateTransform({
			scaleX: 4,
			scaleY: 4,
		})
	}, [app])

	useEffect(() => {
		initDevtools({ app })
	}, [app])

	// Set the viewport when the window is resized
	useEffect(() => {
		// eslint-disable-next-line jsdoc/require-jsdoc
		const handler = () => {
			world.set(Viewport, {
				height: window.innerHeight,
				width: window.innerWidth,
			})
		}
		addEventListener('resize', handler)
		return () => removeEventListener('resize', handler)
	}, [world])

	// Spawn a camera on mount
	useEffect(() => {
		const camera = createCamera()
		return () => camera.destroy()
	}, [createCamera])

	useTick({ callback: runSystems })

	useKeyboardStateSystem()

	return (
		<Renderer />
	)
}
