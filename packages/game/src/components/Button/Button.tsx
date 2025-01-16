// Module imports
import {
	type JSX,
	type PropsWithChildren,
	useMemo,
} from 'react'
import classnames from 'classnames'





// Local imports
import styles from './Button.module.scss'





// Types
type Props = PropsWithChildren<JSX.IntrinsicElements['button'] & {
	isDisabled?: boolean,
	isFullWidth?: boolean,
	variant?: 'default' | 'danger',
}>





/** @type {React.FunctionComponent} */
export function Button(props: Props) {
	const {
		children,
		className,
		isDisabled,
		isFullWidth,
		variant = 'default',
	} = props

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['button']]: true,
			[styles['is-disabled']]: isDisabled,
			[styles['is-full-width']]: isFullWidth,
			[styles[variant]]: true,
		}, className)
	}, [
		className,
		isDisabled,
		isFullWidth,
		variant,
	])

	const domProps = useMemo(() => {
		/* eslint-disable no-shadow, @typescript-eslint/no-unused-vars */
		const {
			isDisabled,
			isFullWidth,
			...otherProps
		} = props
		/* eslint-enable no-shadow, @typescript-eslint/no-unused-vars */

		return otherProps
	}, [props])

	return (
		// eslint-disable-next-line react/forbid-elements
		<button
			{...domProps}
			className={compiledClassName}
			disabled={isDisabled}>
			<div className={styles['shadow']} />
			<div className={styles['background']} />
			<div className={styles['content']}>
				{children}
			</div>
		</button>
	)
}
