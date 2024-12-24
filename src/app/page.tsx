'use client'

// Module imports
import {
	AnimatedSprite,
	BitmapText,
	Container,
	extensions,
	Graphics,
	Sprite,
	TextureStyle,
} from 'pixi.js'
import {
	Application,
	extend,
} from '@pixi/react'
import {
	Suspense,
	useMemo,
	useRef,
} from 'react'
import {
	TiledTilemapLoader,
	TiledTilesetLoader,
} from 'pixi-tiled-loader'
import { LDTKLoader } from 'pixi-ldtk-loader'
import { useStore } from 'statery'





// Local imports
import { AsepriteJSONLoader } from '@/helpers/AsepriteJSONLoader'
import { AssetsLoader } from '@/components/AssetsLoader/AssetsLoader'
import { DebugRenderer } from '@/components/DebugRenderer/DebugRenderer'
import { Game } from '@/components/Game/Game'
import { store } from '@/store/store'
import { world } from '@/store/world'
import { WorldProvider } from 'koota/react'

import styles from './page.module.scss'





extend({
	AnimatedSprite,
	BitmapText,
	Container,
	Graphics,
	Sprite,
})

extensions.add(AsepriteJSONLoader)
extensions.add(LDTKLoader)
extensions.add(TiledTilemapLoader({ loadTilesets: true }))
extensions.add(TiledTilesetLoader({ loadImages: true }))





TextureStyle.defaultOptions.scaleMode = 'nearest'

/**
 * The main page.
 *
 * @component
 */
export default function HomePage() {
	const {
		areAssetsInitialised,
		areBundlesLoaded,
		isWorldInitialised,
		manifest,
	} = useStore(store)

	const applicationRef = useRef(null)
	const resizeToRef = useRef(null)

	const isLoadingAssets = useMemo(() => !manifest || !areAssetsInitialised || !areBundlesLoaded || !isWorldInitialised, [
		areAssetsInitialised,
		areBundlesLoaded,
		isWorldInitialised,
		manifest,
	])

	return (
		<WorldProvider world={world}>
			<main
				className={styles['container']}
				ref={resizeToRef}>
				{isLoadingAssets && (
					<AssetsLoader />
				)}

				{!isLoadingAssets && (
					<Application
						ref={applicationRef}
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
				)}

				<DebugRenderer />
			</main>
		</WorldProvider>
	)
}
