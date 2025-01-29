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
	useEffect,
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
import { sound } from '@pixi/sound'





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





/**
 * The game renderer.
 *
 * @component
 */
export function Game() {
	const resizeToRef = useRef<HTMLDivElement>(null!)
	const {	isLevelLoaded } = useTrait(world, AssetRegistry)!

	useEffect(() => {
		const tiledTilemapLoader = TiledTilemapLoader({ loadTilesets: true })
		const tiledTilesetLoader = TiledTilesetLoader({ loadImages: true })

		extensions.add(AsepriteJSONLoader)
		extensions.add(tiledTilemapLoader)
		extensions.add(tiledTilesetLoader)

		sound.disableAutoPause = true

		TextureStyle.defaultOptions.scaleMode = 'nearest'

		return () => {
			extensions.remove(AsepriteJSONLoader)
			extensions.remove(tiledTilemapLoader)
			extensions.remove(tiledTilesetLoader)
		}
	}, [])

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
