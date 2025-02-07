// Module imports
import {
	type FormEventHandler,
	useCallback,
	useRef,
	useState,
} from 'react'





// Local imports
import { Button } from '@/components/Button/Button'
import { Form } from '@/components/Form/Form'
import { Input } from '@/components/Input/Input'
import { Scene } from '@/components/Scene/Scene'
import { useSceneManagerContext } from '@/components/SceneManager/SceneManagerContext'

import styles from './LoginScene.module.scss'





/**
 * The loading scene.
 *
 * @type {React.FunctionComponent}
 */
export function LoginScene() {
	const { activateScene } = useSceneManagerContext()

	const formRef = useRef<HTMLFormElement>(null)

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isValid, setIsValid] = useState(false)

	const handleChange = useCallback(() => {
		const formElement = formRef.current

		if (formElement !== null) {
			setIsValid(formElement.checkValidity())
		}
	}, [])

	const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(event => {
		// Prevent the browser from reloading the page
		event.preventDefault()

		// Read the form data
		const form = event.target as HTMLFormElement
		const formData = new FormData(form)
		const formJSON = Object.fromEntries(formData.entries())

		console.log('Submitting form data (not really):', formJSON)
		// // You can pass formData as a fetch body directly:
		// fetch('/some-api', {
		// 	body: JSON.stringify(formJSON),
		// 	method: form.method,
		// })

		setIsSubmitting(true)
		setTimeout(() => {
			setIsSubmitting(false)
			activateScene('game')
		}, 2000)
	}, [activateScene])

	return (
		<Scene
			className={styles['container']}
			name={'login'}>
			<Form
				ref={formRef}
				method={'post'}
				onSubmit={handleSubmit}>
				<Input
					isDisabled={isSubmitting}
					label={'Email'}
					onChange={handleChange}
					placeholder={'bernie@birb.house'}
					required
					type={'email'} />

				<Input
					autoComplete={'current-password'}
					isDisabled={isSubmitting}
					label={'Password'}
					onChange={handleChange}
					required
					type={'password'} />

				<Button
					isDisabled={!isValid}
					isLoading={isSubmitting}
					type={'submit'}>
					{'Login'}
				</Button>
			</Form>
		</Scene>
	)
}
