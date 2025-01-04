// Module imports
import {
	useEffect,
	useRef,
} from 'react'
import { Render } from 'matter-js'
import { useStore } from 'statery'





// Local imports
import { store } from '@/store/store'

import styles from './DebugRenderer.module.scss'





/**
 * Renders debug information. Enabled by adding `debug=1` query parameter.
 *
 * @component
 */
export function DebugRenderer() {
	const {
		debugRenderers,
		isDebugModeEnabled,
		physicsEngine,
	} = useStore(store)

	const debugInfoCanvasRef = useRef<HTMLCanvasElement>(null)
	const wireframeCanvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (isDebugModeEnabled) {
			const debugInfoCanvas = debugInfoCanvasRef.current
			const wireframeCanvas = wireframeCanvasRef.current

			store.set(() => {
				const lDebugRenderers = []

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

				return { debugRenderers: lDebugRenderers }
			})
		}
	}, [
		isDebugModeEnabled,
		physicsEngine,
	])

	useEffect(() => {
		if (debugRenderers?.length) {
			debugRenderers.forEach(renderer => {
				Render.run(renderer)
			})
		}
	}, [debugRenderers])

	return (
		<>
			<canvas
				ref={wireframeCanvasRef}
				className={styles['wireframes']} />
			<canvas
				ref={debugInfoCanvasRef}
				className={styles['debug-info']} />
		</>
	)
}
