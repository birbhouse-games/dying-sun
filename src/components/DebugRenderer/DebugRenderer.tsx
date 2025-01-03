// Module imports
import {
	useEffect,
	useRef,
} from 'react'
import { Render } from 'matter-js'
import { useSearchParams } from 'next/navigation'
import { useTrait } from 'koota/react'





// Local imports
import {
	Debug,
	PhysicsEngine,
} from '@/store/traits'
import { world } from '@/store/world'

import styles from './DebugRenderer.module.scss'





/**
 * Renders debug information. Enabled by adding `debug=1` query parameter.
 *
 * @component
 */
export function DebugRenderer() {
	const searchParams = useSearchParams()
	const physicsEngine = useTrait(world, PhysicsEngine)!
	const debug = useTrait(world, Debug)

	const debugInfoCanvasRef = useRef<HTMLCanvasElement>(null)
	const wireframeCanvasRef = useRef<HTMLCanvasElement>(null)

	// Add the debug trait to the world
	useEffect(() => {
		world.add(Debug)
		return () => {
			world.remove(Debug)
		}
	}, [])

	// Create debug renderers
	// This is very hacky and should be refactored
	useEffect(() => {
		if (!debug || debug.renderers?.length) {
			return
		}

		if (searchParams.get('debug')) {
			const debugInfoCanvas = debugInfoCanvasRef.current
			const wireframeCanvas = wireframeCanvasRef.current
			const lDebugRenderers: Render[] = []

			if (debugInfoCanvas) {
				lDebugRenderers.push(Render.create({
					canvas: debugInfoCanvas,
					engine: physicsEngine,
					options: {
						height: window.innerHeight,
						pixelRatio: 4,
						showPerformance: true,
						width: window.innerWidth,
						wireframeBackground: 'transparent',
						wireframes: true,
						// @ts-expect-error wireframeStrokeStyle is missing from the Matter.js types.
						wireframeStrokeStyle: 'transparent',
					},
				}))
			}

			if (wireframeCanvas) {
				lDebugRenderers.push(Render.create({
					canvas: wireframeCanvas,
					engine: physicsEngine,
					options: {
						height: window.innerHeight / 4,
						showAxes: true,
						showBounds: true,
						showCollisions: true,
						showIds: true,
						showSleeping: true,
						showVelocity: true,
						pixelRatio: 8,
						width: window.innerWidth / 4,
						wireframeBackground: 'transparent',
						wireframes: true,
						// @ts-expect-error wireframeStrokeStyle is missing from the Matter.js types.
						wireframeStrokeStyle: 'orange',
					},
				}))
			}

			world.set(Debug, {
				renderers: lDebugRenderers,
			})
		}
	}, [debug, physicsEngine, searchParams])

	// So hacky as well
	useEffect(() => {
		if (debug?.renderers?.length) {
			debug.renderers.forEach(renderer => {
				Render.run(renderer)
			})
		}
	}, [debug])

	return (
		<>
			<canvas
				className={styles['wireframes']}
				ref={wireframeCanvasRef} />
			<canvas
				className={styles['debug-info']}
				ref={debugInfoCanvasRef} />
		</>
	)
}
