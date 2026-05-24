// Module imports
import {
	useLayoutEffect,
	useRef,
} from 'react'





// Local imports
import { PerformanceStats as PerformanceStatsTrait } from '@/store/traits/PerformanceStats'
import { world } from '@/store/world'

import styles from './PerformanceStats.module.scss'





/**
 * Renders performance stats.
 *
 * @type {React.FunctionComponent}
 */
export function PerformanceStats() {
	const elementRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const element = elementRef.current
		const stats = world.get(PerformanceStatsTrait)!

		if (element && (stats.dom.parentElement !== element)) {
			element.appendChild(stats.dom)
		}
	}, [])

	return (
		<div
			ref={elementRef}
			className={styles['container']}
			id={'performance-stats'} />
	)
}
