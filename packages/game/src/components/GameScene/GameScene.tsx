// Module imports
import { Scene } from '@dying-sun/shared-components'





// Local imports
import { Game } from '@/components/Game/Game'

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
