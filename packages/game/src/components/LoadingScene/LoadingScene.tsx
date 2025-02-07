// Module imports
import { useCallback } from 'react'





// Local imports
import { AssetsLoader } from '@/components/AssetsLoader/AssetsLoader'
import { Scene } from '@/components/Scene/Scene'
import { useSceneManagerContext } from '@/components/SceneManager/SceneManagerContext'

import styles from './LoadingScene.module.scss'





/**
 * The loading scene.
 *
 * @type {React.FunctionComponent}
 */
export function LoadingScene() {
	const { activateScene } = useSceneManagerContext()

	const handleComplete = useCallback(() => {
		activateScene('login')
	}, [activateScene])

	return (
		<Scene
			className={styles['container']}
			name={'loading'}>
			<AssetsLoader onComplete={handleComplete} />
			{'Loading...'}
		</Scene>
	)
}
