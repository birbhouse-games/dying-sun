// Module imports
import { Application } from '@pixi/react'
import { Suspense } from 'react'
import { WorldProvider } from 'koota/react'





// Local imports
import { Game } from '@/components/Game/Game'
import { world } from '@/store/world'




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
			{/* We do this since there is no context forwarding for Pixi React */}
			<WorldProvider world={world}>
				<Suspense fallback={<pixiText text={'Loading...'} />}>
					<Game />
				</Suspense>
			</WorldProvider>
		</Application>
	)
}
