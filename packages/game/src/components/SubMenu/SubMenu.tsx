// Module imports
import { type PropsWithChildren } from 'react'





// Local imports
import { Frame } from '@/components/Frame/Frame'

import styles from './SubMenu.module.scss'





// Types
type Props = PropsWithChildren<{ label: string }>





/** @type {React.FunctionComponent} */
export function SubMenu(props: Props) {
	const {
		children,
		label,
	} = props

	return (
		<Frame className={styles['container']}>
			<header>
				{label}
			</header>

			<div className={styles['content']}>
				{children}
			</div>
		</Frame>
	)
}
