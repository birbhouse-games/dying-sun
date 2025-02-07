// Module imports
import {
	type ComponentProps,
	useMemo,
} from 'react'
import classnames from 'classnames'
import { motion } from 'motion/react'





// Local imports
import styles from './LoadingIcon.module.scss'





// Types
type Props = ComponentProps<'div'> & {
	isDark?: boolean,
}





/**
 * @type {React.FunctionComponent}
 */
export function LoadingIcon(props: Props) {
	const {
		className,
		isDark,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['container']]: true,
			[styles['is-dark']]: isDark,
		}, className)
	}, [
		className,
		isDark,
	])

	return (
		<div className={compiledClassName}>
			<motion.div className={styles['dot']}>{'·'}</motion.div>
			<motion.div className={styles['dot']}>{'·'}</motion.div>
			<motion.div className={styles['dot']}>{'·'}</motion.div>
		</div>
	)
}
