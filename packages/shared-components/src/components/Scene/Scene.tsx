// Module imports
import {
	AnimatePresence,
	motion,
	Variants,
} from 'motion/react'
import {
	type PropsWithChildren,
	useMemo,
} from 'react'
import classnames from 'classnames'
import { useStore } from 'statery'





// Local imports
import { store } from '../../store/store'

import styles from './Scene.module.scss'





// Types
type Props = PropsWithChildren<{
	className?: string,
	name: string,
}>





// Constants
const VARIANTS: Variants = {
	initial: {
		opacity: 0,
		x: '0%',
		transition: {
			duration: 2,
		},
	},
	enter: {
		opacity: 1,
		x: '0%',
		transition: {
			duration: 2,
		},
	},
	exit: {
		opacity: 1,
		x: '0%',
		transition: {
			duration: 2,
		},
	},
}





/**
 * Wraps a scene.
 *
 * @type {React.FunctionComponent}
 */
export function Scene(props: Props) {
	const {
		children,
		className,
		name,
	} = props

	const { currentScene } = useStore(store)

	const compiledClassName = useMemo(() => {
		return classnames(styles['container'], className)
	}, [className])

	return (
		<AnimatePresence propagate>
			{(currentScene === name) && (
				<motion.div
					animate={'enter'}
					className={compiledClassName}
					exit={'exit'}
					initial={'initial'}
					variants={VARIANTS}>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
