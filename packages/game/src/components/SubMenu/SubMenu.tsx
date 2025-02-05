// Module imports
import {
	type Transition,
	type Variants,
} from 'motion/react'
import { type PropsWithChildren } from 'react'





// Local imports
import { Frame } from '@/components/Frame/Frame'

import styles from './SubMenu.module.scss'





// Types
type Props = PropsWithChildren<{
	label: string
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





/** @type {React.FunctionComponent} */
export function SubMenu(props: Props) {
	const {
		children,
		label,
	} = props

	return (
		<Frame
			animate={'visible'}
			className={styles['container']}
			exit={'hidden'}
			initial={'hidden'}
			transition={SUBMENU_TRANSITION}
			variants={SUBMENU_VARIANTS}>
			<header className={styles['label']}>
				{label}
			</header>

			<div className={styles['content']}>
				{children}
			</div>
		</Frame>
	)
}
