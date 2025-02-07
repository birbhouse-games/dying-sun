// Module imports
import {
	AnimatedSprite,
	BitmapText,
	Container,
	Graphics,
	Sprite,
} from 'pixi.js'
import {
	Application,
	extend,
} from '@pixi/react'
import {
	Suspense,
	useRef,
} from 'react'





// Local imports
import { ApplicationEntryPoint } from './ApplicationEntryPoint'
import { DebugRenderer } from '@/components/DebugRenderer/DebugRenderer'
import { UIWrapper } from '@/components/UIWrapper/UIWrapper'

import styles from './Game.module.scss'





extend({
	AnimatedSprite,
	BitmapText,
	Container,
	Graphics,
	Sprite,
})





/**
 * The game renderer.
 *
 * @component
 */
export function Game() {
	const resizeToRef = useRef<HTMLDivElement>(null!)

	return (
		<div className={styles['wrapper']}>
			<main
				ref={resizeToRef}
				className={styles['container']}>
				<Application
					antialias={false}
					autoDensity
					resizeTo={resizeToRef}
					resolution={window.devicePixelRatio ?? 1}
					roundPixels>
					<Suspense fallback={<pixiText text={'Loading...'} />}>
						<ApplicationEntryPoint />
					</Suspense>
				</Application>

				<UIWrapper />

				<DebugRenderer />
			</main>
		</div>
	)
}
