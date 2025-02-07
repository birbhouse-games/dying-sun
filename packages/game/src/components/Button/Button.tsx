// Module imports
import {
	AnimatePresence,
	motion,
	MotionProps,
} from 'motion/react'
import {
	type ComponentProps,
	useMemo,
} from 'react'
import classnames from 'classnames'





// Local imports
import { LoadingIcon } from '@/components/LoadingIcon/LoadingIcon'

import styles from './Button.module.scss'





// Types
type ButtonProps = ComponentProps<'button'> & MotionProps
type Props = ButtonProps & {
	isDisabled?: boolean,
	isLoading?: boolean,
	isFullWidth?: boolean,
	variant?: 'default' | 'danger',
}





// Constants
const CONTENT_VARIANTS = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
}
const LOADING_VARIANTS = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
}





/** @type {React.FunctionComponent} */
export function Button(props: Props) {
	const {
		children,
		className,
		isDisabled,
		isLoading,
		isFullWidth,
		type = 'button',
		variant = 'default',
	} = props

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['button']]: true,
			[styles['is-disabled']]: isDisabled,
			[styles['is-loading']]: isLoading,
			[styles['is-full-width']]: isFullWidth,
			[styles[variant]]: true,
		}, className)
	}, [
		className,
		isDisabled,
		isLoading,
		isFullWidth,
		variant,
	])

	const htmlProps = useMemo<ButtonProps>(() => {
		const result = { ...props }

		delete result.isDisabled
		delete result.isLoading
		delete result.isFullWidth
		delete result.type

		return result
	}, [props])

	return (
		<motion.button
			{...htmlProps}
			className={compiledClassName}
			disabled={isDisabled}
			type={type}>
			<div className={styles['shadow']} />
			<div className={styles['background']} />
			<AnimatePresence mode={'popLayout'}>
				{!isLoading && (
					<motion.div
						key={'not-loading'}
						animate={'visible'}
						className={styles['content']}
						exit={'hidden'}
						initial={'hidden'}
						layoutId={'not-loading'}
						variants={CONTENT_VARIANTS}>
						{children}
					</motion.div>
				)}

				{isLoading && (
					<motion.div
						key={'loading'}
						animate={'visible'}
						className={styles['content']}
						exit={'hidden'}
						initial={'hidden'}
						layoutId={'loading'}
						variants={LOADING_VARIANTS}>
						<LoadingIcon
							className={styles['loading-icon']}
							isDark />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.button>
	)
}
