// Module imports
import {
	type ChangeEvent,
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
	onSuccess: () => unknown
}>





/**
 * The authentication UI.
 *
 * @type {React.FunctionComponent}
 */
export function RegistrationForm(props: Props) {
	const {
		children,
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

	const handleValidateConfirmPassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const {
			form,
			value,
		} = event.target

		if (!value) {
			return null
		}

		if (new FormData(form!).get('password') !== value) {
			return ['Passwords do not match']
		}

		return null
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
			.registerNewAccount(formJSON.email, formJSON.password)
			.then(() => {
				onSuccess()
				return null
			})
			.catch((error: AuthError) => {
				console.log('ERROR', error)
			})
	}, [onSuccess])

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
				autoComplete={'new-password'}
				isDisabled={isSubmitting}
				label={'Password'}
				name={'password'}
				onChange={handleChange}
				required
				type={'password'} />

			<Input
				autoComplete={'new-password'}
				isDisabled={isSubmitting}
				label={'Confirm Password'}
				name={'confirm-password'}
				onChange={handleChange}
				required
				type={'password'}
				validate={handleValidateConfirmPassword} />

			<Button
				isDisabled={!isValid}
				isLoading={isSubmitting}
				type={'submit'}>
				{'Create account'}
			</Button>

			{children}
		</Form>
	)
}
