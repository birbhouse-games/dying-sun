'use client'

// Module imports
import { Game } from '@dying-sun/game'
import { useRef } from 'react'





// Local imports

import styles from './page.module.scss'





/**
 * The main page.
 *
 * @component
 */
export default function HomePage() {
	const resizeToRef = useRef(null)

	return (
		<main
			className={styles['container']}
			ref={resizeToRef}>
			<Game />
		</main>
	)
}
