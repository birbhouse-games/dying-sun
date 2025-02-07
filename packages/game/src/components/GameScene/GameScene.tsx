// Local imports
import { Game } from '@/components/Game/Game'
import { Scene } from '@/components/Scene/Scene'

import styles from './GameScene.module.scss'





/**
 * The loading scene.
 *
 * @type {React.FunctionComponent}
 */
export function GameScene() {
	return (
		<Scene
			className={styles['container']}
			name={'game'}>
			<Game />
		</Scene>
	)
}
