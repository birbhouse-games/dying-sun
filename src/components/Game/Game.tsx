// Module imports
import {
	useApplication,
	useTick,
} from '@pixi/react'
import { initDevtools } from '@pixi/devtools'
import { useEffect } from 'react'





// Local imports
import { actorSystem } from '@/systems/actorSystem'
import { cameraSystem } from '@/systems/cameraSystem'
import { controlsSystem } from '@/systems/controlsSystem'
import { entitySortSystem } from '@/systems/entitySortSystem'
import { movementSystem } from '@/systems/movementSystem'
import { physicsSystem } from '@/systems/physicsSystem'
import { Renderer } from '@/components/Renderer/Renderer'
import { timeSystem } from '@/systems/timeSystem'

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

	useTick({
		// eslint-disable-next-line jsdoc/require-jsdoc
		callback: ticker => {
			timeSystem()
			controlsSystem()
			movementSystem()
			physicsSystem(ticker)
			actorSystem()
			entitySortSystem()
			cameraSystem()
		},
	})

	useKeyboardStateSystem()

	return (
		<Renderer />
	)
}
