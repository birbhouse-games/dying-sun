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
	TiledTilemapLoader,
	TiledTilesetLoader,
} from 'pixi-tiled-loader'
import {
	useTrait,
	WorldProvider,
} from 'koota/react'
import dynamic from 'next/dynamic'
import { extend } from '@pixi/react'
import { LDTKLoader } from 'pixi-ldtk-loader'
import { useRef } from 'react'





// Local imports
import { AsepriteJSONLoader } from '@/helpers/AsepriteJSONLoader'
import { AssetRegistry } from '@/store/traits'
import { AssetsLoader } from '@/components/AssetsLoader/AssetsLoader'
import { DebugRenderer } from '@/components/DebugRenderer/DebugRenderer'
import { world } from '@/store/world'

import styles from './page.module.scss'

const GameEntryPoint = dynamic(() => import('@/components/GameEntryPoint/GameEntryPoint'), {
	ssr: false,
})





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
	const resizeToRef = useRef<HTMLDivElement>(null!)
	const {	isLevelLoaded } = useTrait(world, AssetRegistry)!

	return (
		<WorldProvider world={world}>
			<main
				className={styles['container']}
				ref={resizeToRef}>
				{!isLevelLoaded && (
					<AssetsLoader />
				)}

				{isLevelLoaded && (
					<GameEntryPoint resizeToRef={resizeToRef} />
				)}

				<DebugRenderer />
			</main>
		</WorldProvider>
	)
}
