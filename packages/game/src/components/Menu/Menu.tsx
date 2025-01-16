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
	submenu?: ReactNode,
	title: string,
}>





// Constants
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





/**
 * @type {React.FunctionComponent}
 */
export function Menu(props: Props) {
	const {
		children,
		submenu,
		title,
	} = props

	return (
		<div className={styles['container']}>
			<div className={styles['top-level']}>
				<div className={styles['background']} />

				<header className={styles['title']}>
					{title}
				</header>

				<div className={styles['content']}>
					{children}
				</div>
			</div>

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
