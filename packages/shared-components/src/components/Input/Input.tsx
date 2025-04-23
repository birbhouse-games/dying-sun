// Module imports
import {
	AnimatePresence,
	motion,
} from 'motion/react'
import {
	type ChangeEvent,
	type ChangeEventHandler,
	type ComponentProps,
	useCallback,
	useId,
	useMemo,
	useState,
} from 'react'
import classnames from 'classnames'





// Local imports
import styles from './Input.module.scss'





// Types
type InputProps = ComponentProps<'input'>
type Props = InputProps & {
	isDisabled?: boolean,
	label?: string,
	validate?: (event: ChangeEvent<HTMLInputElement>) => null | string[],
}





// Constants
const ICON_VARIANTS = {
	hidden: {
		opacity: 0,
		x: '-100%',
		y: '-50%',
	},
	visible: {
		opacity: 1,
		x: '0%',
		y: '-50%',
	},
}





/**
 * @type {React.FunctionComponent}
 */
export function Input(props: Props) {
	const {
		className,
		id,
		isDisabled,
		label,
		onChange,
		validate,
	} = props

	const [isValid, setIsValid] = useState<null | boolean>(null)
	const [validationErrors, setValidationErrors] = useState<null | string[]>(null)

	const backupID = useId()

	const htmlProps = useMemo<InputProps>(() => {
		const result = { ...props }

		delete result.className
		delete result.id
		delete result.isDisabled
		delete result.onChange
		delete result.validate

		return result
	}, [props])

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['container']]: true,
			[styles['is-disabled']]: isDisabled,
			[styles['is-invalid']]: isValid === false,
			[styles['is-valid']]: isValid === true,
		}, className)
	}, [
		className,
		isDisabled,
		isValid,
	])

	const inputID = useMemo(() => id ?? backupID, [
		backupID,
		id,
	])

	const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
		let customValidationResult = null

		if (typeof validate === 'function') {
			customValidationResult = validate(event)

			if (customValidationResult?.length) {
				setValidationErrors(customValidationResult)
			} else {
				setValidationErrors(null)
			}
		}

		setIsValid(
			event.target.value
				? !customValidationResult?.length && event.target.checkValidity()
				: null,
		)

		if (onChange) {
			onChange(event)
		}
	}, [
		onChange,
		validate,
	])

	return (
		<div className={compiledClassName}>
			{Boolean(label) && (
				<label htmlFor={inputID}>
					{label}
				</label>
			)}

			<div className={styles['wrapper']}>
				<div className={styles['shadow']} />
				<div className={styles['background']} />

				<AnimatePresence>
					{(!isDisabled && (isValid === true)) && (
						<motion.div
							key={'checkmark'}
							animate={'visible'}
							className={styles['checkmark']}
							exit={'hidden'}
							initial={'hidden'}
							variants={ICON_VARIANTS} />
					)}

					{(!isDisabled && (isValid === false)) && (
						<motion.div
							key={'x-mark'}
							animate={'visible'}
							className={styles['x-mark']}
							exit={'hidden'}
							initial={'hidden'}
							variants={ICON_VARIANTS} />
					)}
				</AnimatePresence>

				<input
					{...htmlProps}
					className={styles['input']}
					disabled={isDisabled}
					id={inputID}
					onChange={handleChange} />
			</div>

			{Boolean(validationErrors) && (
				<div className={styles['validation-messages']}>
					{validationErrors!.map((message, index) => (
						<div key={index}>
							{message}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
