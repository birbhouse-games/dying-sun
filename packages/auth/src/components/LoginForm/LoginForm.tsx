// Module imports
import {
	type FormEventHandler,
	type PropsWithChildren,
	useCallback,
	useRef,
	useState,
} from 'react'
import { type AuthError } from '@supabase/supabase-js'





// Local imports
import {
	Button,
	Form,
	Input,
} from '@dying-sun/shared-components'
import * as API from '../../helpers/API'





// Types
type Props = PropsWithChildren<{
	onError: (error: AuthError) => unknown,
	onSuccess: () => unknown,
}>





/**
 * The authentication UI.
 *
 * @type {React.FunctionComponent}
 */
export function LoginForm(props: Props) {
	const {
		children,
		onError,
		onSuccess,
	} = props

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
		const formJSON = Object.fromEntries(formData.entries()) as {
			email: string,
			password: string,
		}

		setIsSubmitting(true)

		API
			.signInWithEmail(formJSON.email, formJSON.password)
			.then(() => {
				onSuccess()
				return null
			})
			.catch((error: AuthError) => {
				setIsSubmitting(false)
				onError(error)
			})
	}, [
		onError,
		onSuccess,
	])

	return (
		<Form
			ref={formRef}
			method={'post'}
			onSubmit={handleSubmit}>
			<Input
				isDisabled={isSubmitting}
				label={'Email'}
				name={'email'}
				onChange={handleChange}
				placeholder={'bernie@birb.house'}
				required
				type={'email'} />

			<Input
				autoComplete={'current-password'}
				isDisabled={isSubmitting}
				label={'Password'}
				name={'password'}
				onChange={handleChange}
				required
				type={'password'} />

			<Button
				isDisabled={!isValid}
				isLoading={isSubmitting}
				type={'submit'}>
				{'Login'}
			</Button>

			{children}
		</Form>
	)
}
