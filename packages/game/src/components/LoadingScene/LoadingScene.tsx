// Module imports
import {
	Scene,
	SceneManager,
} from '@dying-sun/shared-components'
import { useCallback } from 'react'





// Local imports
import { AssetsLoader } from '@/components/AssetsLoader/AssetsLoader'

import styles from './LoadingScene.module.scss'





/**
 * The loading scene.
 *
 * @type {React.FunctionComponent}
 */
export function LoadingScene() {
	const handleComplete = useCallback(() => {
		SceneManager.activateScene('auth')
	}, [])

	return (
		<Scene
			className={styles['container']}
			name={'loading'}>
			<AssetsLoader onComplete={handleComplete} />
			{'Loading...'}
		</Scene>
	)
}
