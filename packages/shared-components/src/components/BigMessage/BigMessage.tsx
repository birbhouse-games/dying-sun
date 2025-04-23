// Module imports
import { PropsWithChildren } from 'react'





// Local imports
import styles from './BigMessage.module.scss'




// Types
type Props = PropsWithChildren





/**
 * @type {React.FunctionComponent}
 */
export function BigMessage(props: Props) {
	const { children } = props

	return (
		<div className={styles['container']}>
			<div className={styles['background']} />

			{children}
		</div>
	)
}
