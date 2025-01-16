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
	useRef,
} from 'react'
import {
	TiledTilemapLoader,
	TiledTilesetLoader,
} from 'pixi-tiled-loader'
import {
	useTrait,
	WorldProvider,
} from 'koota/react'
import { LDTKLoader } from 'pixi-ldtk-loader'





// Local imports
import { ApplicationEntryPoint } from './ApplicationEntryPoint'
import { AsepriteJSONLoader } from '@/helpers/AsepriteJSONLoader'
import { AssetRegistry } from '@/store/traits'
import { AssetsLoader } from '@/components/AssetsLoader/AssetsLoader'
import { DebugRenderer } from '@/components/DebugRenderer/DebugRenderer'
import { UIWrapper } from '@/components/UIWrapper/UIWrapper'
import { world } from '@/store/world'

import styles from './Game.module.scss'





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
 * The game renderer.
 *
 * @component
 */
export function Game() {
	const resizeToRef = useRef<HTMLDivElement>(null!)
	const {	isLevelLoaded } = useTrait(world, AssetRegistry)!

	return (
		<div className={styles['wrapper']}>
			<WorldProvider world={world}>
				<main
					ref={resizeToRef}
					className={styles['container']}>
					<Suspense>
						{!isLevelLoaded && (
							<AssetsLoader />
						)}

						{isLevelLoaded && (
							<>
								<Application
									antialias={false}
									attachToDevTools
									autoDensity
									resizeTo={resizeToRef}
									resolution={window.devicePixelRatio ?? 1}
									roundPixels>
									<Suspense fallback={<pixiText text={'Loading...'} />}>
										<ApplicationEntryPoint />
									</Suspense>
								</Application>

								<UIWrapper />
							</>
						)}

						<DebugRenderer />
					</Suspense>
				</main>
			</WorldProvider>
		</div>
	)
}
