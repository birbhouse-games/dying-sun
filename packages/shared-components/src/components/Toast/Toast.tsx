// Module imports
import {
	motion,
	type Variants,
} from 'motion/react'
import classnames from 'classnames'





// Local imports
import { type ToastData } from '../../typedefs/ToastData'

import styles from './Toast.module.scss'





// Types
interface Props {
	toast: ToastData,
}





// Constants
const TOAST_VARIANTS: Variants = {
	animate: {
		opacity: 1,
		x: 0,
		y: 0,
		transition: {
			bounce: 0.1,
			type: 'spring',
		},
	},
	exit: {
		opacity: 0,
		x: 100,
		y: 0,
	},
	initial: {
		opacity: 0,
		x: 0,
		y: -100,
	},
}





/**
 * @type {React.FunctionComponent}
 */
export function Toast(props: Props) {
	const {
		id,
		type,
		message,
	} = props.toast

	const compiledClassName = classnames({
		[styles['container']]: true,
		[styles['is-default']]: type === 'default',
		[styles['is-error']]: type === 'error',
		[styles['is-info']]: type === 'info',
		[styles['is-success']]: type === 'success',
	})

	return (
		<motion.div
			key={id}
			animate={'animate'}
			className={compiledClassName}
			exit={'exit'}
			initial={'initial'}
			layout
			variants={TOAST_VARIANTS}>
			<div className={styles['shadow']} />
			<div className={styles['background']} />
			<div className={styles['icon']} />
			<div className={styles['content']}>
				{message}
			</div>
		</motion.div>
	)
}
