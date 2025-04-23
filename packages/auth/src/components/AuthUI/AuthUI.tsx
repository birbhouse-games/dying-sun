// Module imports
import {
	useCallback,
	useState,
} from 'react'
import { AuthError } from '@supabase/supabase-js'
import { motion } from 'motion/react'





// Local imports
import {
	Button,
	ToastManager,
} from '@dying-sun/shared-components'
import { Authenticator } from '../Authenticator/Authenticator'
import { humanizeErrorMessage } from '../../helpers/humanizeErrorMessage'
import { LoginForm } from '../LoginForm/LoginForm'
import { RegistrationForm } from '../RegistrationForm/RegistrationForm'

import styles from './AuthUI.module.scss'





// Types
interface Props {
	onSuccess: () => unknown,
}





/**
 * The authentication UI.
 *
 * @type {React.FunctionComponent}
 */
export function AuthUI(props: Props) {
	const { onSuccess } = props

	const [viewMode, setViewMode] = useState<'authenticating' | 'login' | 'registration'>('authenticating')

	const handleAuthenticationError = useCallback(() => {
		setViewMode('login')
	}, [])

	const handleAuthenticationSuccess = useCallback(() => {
		if (typeof onSuccess === 'function') {
			onSuccess()
		} else {
			console.log('No success function defined')
		}
	}, [onSuccess])

	const handleLoginError = useCallback((error: AuthError) => {
		ToastManager.addToast({
			message: humanizeErrorMessage(error),
			type: 'error',
		})
	}, [])

	const handleLoginSuccess = useCallback(() => {
		onSuccess()
	}, [onSuccess])

	const handleRegistrationSuccess = useCallback(() => {
		ToastManager.addToast({
			message: 'Your account has been created and you may now login.',
			type: 'success',
		})
		setViewMode('login')
	}, [])

	const showLogin = useCallback(() => {
		setViewMode('login')
	}, [])

	const showRegistration = useCallback(() => {
		setViewMode('registration')
	}, [])

	return (
		<motion.div
			className={styles['wrapper']}
			layout>
			{(viewMode === 'authenticating') && (
				<Authenticator
					onError={handleAuthenticationError}
					onSuccess={handleAuthenticationSuccess} />
			)}

			{(viewMode === 'login') && (
				<LoginForm
					onError={handleLoginError}
					onSuccess={handleLoginSuccess}>
					<Button onClick={showRegistration}>
						{'Create new account'}
					</Button>
				</LoginForm>
			)}

			{(viewMode === 'registration') && (
				<RegistrationForm onSuccess={handleRegistrationSuccess}>
					<Button onClick={showLogin}>
						{'I have an account'}
					</Button>
				</RegistrationForm>
			)}

			<ToastManager />
		</motion.div>
	)
}
