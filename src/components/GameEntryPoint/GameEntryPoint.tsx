// Module imports
import { Application } from '@pixi/react'
import { Suspense } from 'react'





// Local imports
import { Game } from '@/components/Game/Game'




/**
 * Main game entry point.
 *
 * @component
 */
export default function GameEntryPoint({ resizeToRef }: { resizeToRef: React.RefObject<HTMLDivElement> }) {
	return (
		<Application
			antialias={false}
			attachToDevTools
			autoDensity={true}
			resizeTo={resizeToRef}
			resolution={window.devicePixelRatio ?? 1}
			roundPixels={true}>
			<Suspense fallback={<pixiText text={'Loading...'} />}>
				<Game />
			</Suspense>
		</Application>
	)
}
