// Module imports
import {
	useEffect,
	useRef,
} from 'react'
import { Render } from 'matter-js'
import { useSearchParams } from 'next/navigation'
import { useStore } from 'statery'





// Local imports
import { store } from '@/store/store'

import styles from './DebugRenderer.module.scss'





export function DebugRenderer() {
	const searchParams = useSearchParams()
	const {
		debugRenderers,
		physicsEngine,
	} = useStore(store)

	const debugInfoCanvasRef = useRef<HTMLCanvasElement>(null)
	const wireframeCanvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (searchParams.get('debug')) {
			const debugInfoCanvas = debugInfoCanvasRef.current
			const wireframeCanvas = wireframeCanvasRef.current

			store.set(() => {
				const debugRenderers = []

				if (debugInfoCanvas) {
					debugRenderers.push(Render.create({
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
					debugRenderers.push(Render.create({
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

				return { debugRenderers }
			})
		}
	}, [
		physicsEngine,
		searchParams,
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
				className={styles['wireframes']}
				ref={wireframeCanvasRef} />
			<canvas
				className={styles['debug-info']}
				ref={debugInfoCanvasRef} />
		</>
	)
}
