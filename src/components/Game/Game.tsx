// Module imports
import {
	useApplication,
	useTick,
} from '@pixi/react'
import { initDevtools } from '@pixi/devtools'
import { useEffect } from 'react'





// Local imports
import { Renderer } from '@/components/Renderer/Renderer'
import { runSystems } from '@/helpers/runSystems'

import { useKeyboardStateSystem } from '@/hooks/useKeyboardStateSystem'





/**
 * Main game component. owns the renderer and runs all systems.
 *
 * @component
 */
export function Game() {
	const { app } = useApplication()

	useEffect(() => {
		app.stage.updateTransform({
			scaleX: 4,
			scaleY: 4,
		})
	}, [app])

	useEffect(() => {
		initDevtools({ app })
	}, [app])

	useTick({ callback: runSystems })

	useKeyboardStateSystem()

	return (
		<Renderer />
	)
}
