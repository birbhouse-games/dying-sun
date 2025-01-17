// Module imports
import {
	AnimatePresence,
	motion,
	type Transition,
	type Variants,
} from 'motion/react'
import {
	type PropsWithChildren,
	type ReactNode,
} from 'react'





// Local imports
import styles from './Menu.module.scss'





// Types
type Props = PropsWithChildren<{
	label: string,
	submenu?: ReactNode,
}>





// Constants
const BACKGROUND_TRANSITION: Transition = {
	duration: 0.1,
}
const BACKGROUND_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
}
const SUBMENU_TRANSITION: Transition = {
	bounce: 0.2,
	duration: 0.5,
	type: 'spring',
}
const SUBMENU_VARIANTS: Variants = {
	hidden: {
		x: '-100%',
	},
	visible: {
		x: '0%',
	},
}
const TOP_LEVEL_MENU_TRANSITION: Transition = {
	bounce: 0.25,
	duration: 0.7,
	type: 'spring',
}
const TOP_LEVEL_MENU_VARIANTS: Variants = {
	hidden: {
		x: '-150%',
	},
	visible: {
		x: '0%',
	},
}





/**
 * @type {React.FunctionComponent}
 */
export function Menu(props: Props) {
	const {
		children,
		label,
		submenu,
	} = props

	return (
		<div className={styles['container']}>
			<motion.div
				animate={'visible'}
				className={styles['background']}
				exit={'hidden'}
				initial={'hidden'}
				transition={BACKGROUND_TRANSITION}
				variants={BACKGROUND_VARIANTS} />

			<motion.div
				animate={'visible'}
				className={styles['top-level']}
				exit={'hidden'}
				initial={'hidden'}
				transition={TOP_LEVEL_MENU_TRANSITION}
				variants={TOP_LEVEL_MENU_VARIANTS}>
				<div className={styles['background']} />

				<header className={styles['label']}>
					{label}
				</header>

				<div className={styles['content']}>
					{children}
				</div>
			</motion.div>

			<AnimatePresence>
				{Boolean(submenu) && (
					<motion.div
						animate={'visible'}
						className={styles['submenu-wrapper']}
						exit={'hidden'}
						initial={'hidden'}
						transition={SUBMENU_TRANSITION}
						variants={SUBMENU_VARIANTS}>
						{submenu}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
