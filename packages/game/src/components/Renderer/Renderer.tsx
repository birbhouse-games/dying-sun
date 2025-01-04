// Module imports
import {
	useApplication,
	useTick,
} from '@pixi/react'
import { initDevtools } from '@pixi/devtools'
import { useEffect } from 'react'
import { useStore } from 'statery'





// Local imports
import { BackgroundRenderer } from '@/components/BackgroundRenderer/BackgroundRenderer'
import { EntitiesRenderer } from '@/components/EntitiesRenderer/EntitiesRenderer'
import { runSystems } from '@/helpers/runSystems'
import { store } from '@/store/store'

import { useKeyboardStateSystem } from '@/hooks/useKeyboardStateSystem'





/**
 * Main game component. owns the renderer and runs all systems.
 *
 * @component
 */
export function Renderer() {
	const { app } = useApplication()
	const {
		worldPositionX,
		worldPositionY,
	} = useStore(store)

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
		<container
			x={worldPositionX}
			y={worldPositionY}>
			<BackgroundRenderer />
			<EntitiesRenderer />
		</container>
	)
}
