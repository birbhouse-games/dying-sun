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
import { SceneManager } from '@dying-sun/shared-components'
import { sound } from '@pixi/sound'
import { useLayoutEffect } from 'react'
import { WorldProvider } from 'koota/react'





// Local imports
import { AsepriteJSONLoader } from '@/helpers/AsepriteJSONLoader'
import { AuthScene } from '@/components/AuthScene/AuthScene'
import { CharacterSelectScene } from '@/components/CharacterSelectScene/CharacterSelectScene'
import { GameScene } from '@/components/GameScene/GameScene'
import { LoadingScene } from '@/components/LoadingScene/LoadingScene'
import { world } from '@/store/world'





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
		<WorldProvider world={world}>
			<SceneManager>
				<AuthScene key={'scene::login'} />
				<CharacterSelectScene key={'scene::character-select'} />
				<GameScene key={'scene::game'} />
				<LoadingScene key={'scene::loading'} />
			</SceneManager>
		</WorldProvider>
	)
}
