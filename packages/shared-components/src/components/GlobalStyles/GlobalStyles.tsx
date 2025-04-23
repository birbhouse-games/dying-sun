// Local imports
import { PropsWithChildren } from 'react'

import styles from './GlobalStyles.module.scss'





// Types
type Props = PropsWithChildren





/**
 * Contains the global styles for applications, such as default CSS variables and webfonts.
 *
 * @type {React.FunctionComponent}
 */
export function GlobalStyles(props: Props) {
	const { children } = props

	return (
		<div className={styles['container']}>
			{children}
		</div>
	)
}
