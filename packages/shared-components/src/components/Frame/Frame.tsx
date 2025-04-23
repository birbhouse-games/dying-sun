// Module imports
import {
	motion,
	type Transition,
	type VariantLabels,
	type Variants,
} from 'motion/react'
import {
	type PropsWithChildren,
	useMemo,
} from 'react'
import classnames from 'classnames'





// Local imports
import styles from './Frame.module.scss'





// Types
type Props = PropsWithChildren<{
	animate?: VariantLabels
	className?: string
	exit?: VariantLabels
	initial?: VariantLabels
	transition?: Transition
	variants?: Variants
}>





/** @type {React.FunctionComponent} */
export function Frame(props: Props) {
	const {
		animate,
		children,
		className,
		exit,
		initial,
		transition,
		variants,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(styles['container'], className)
	}, [className])

	return (
		<motion.div
			animate={animate}
			className={compiledClassName}
			exit={exit}
			initial={initial}
			layout
			transition={transition}
			variants={variants}>
			{children}
		</motion.div>
	)
}
