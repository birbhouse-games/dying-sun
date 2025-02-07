'use client'

// Module imports
import {
	extensions,
	TextureStyle,
} from 'pixi.js'
import {
	TiledTilemapLoader,
	TiledTilesetLoader,
} from 'pixi-tiled-loader'
import { sound } from '@pixi/sound'
import { useLayoutEffect } from 'react'
import { WorldProvider } from 'koota/react'





// Local imports
import { AsepriteJSONLoader } from '@/helpers/AsepriteJSONLoader'
import { GameScene } from '@/components/GameScene/GameScene'
import { LoadingScene } from '@/components/LoadingScene/LoadingScene'
import { LoginScene } from '../LoginScene/LoginScene'
import { SceneManager } from '@/components/SceneManager/SceneManager'
import { world } from '@/store/world'

import styles from './EntryPoint.module.scss'





/**
 * The main entry point of the whole application.
 *
 * @type {React.FunctionComponent}
 */
export function EntryPoint() {
	useLayoutEffect(() => {
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
		<div className={styles['container']}>
			<WorldProvider world={world}>
				<SceneManager>
					<LoadingScene key={'scene::loading'} />
					<LoginScene key={'scene::login'} />
					<GameScene key={'scene::game'} />
				</SceneManager>
			</WorldProvider>
		</div>
	)
}
