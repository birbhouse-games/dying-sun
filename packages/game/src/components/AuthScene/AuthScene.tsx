// Module imports
import {
	Scene,
	SceneManager,
} from '@dying-sun/shared-components'
import { AuthUI } from '@dying-sun/auth'
import { useCallback } from 'react'





/**
 * The loading scene.
 *
 * @type {React.FunctionComponent}
 */
export function AuthScene() {
	const handleAuthSuccess = useCallback(() => {
		SceneManager.activateScene('character-select')
	}, [])

	return (
		<Scene name={'auth'}>
			<AuthUI onSuccess={handleAuthSuccess} />
		</Scene>
	)
}
