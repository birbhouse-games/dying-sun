// Module imports
import { type PropsWithChildren } from 'react'





// Local imports
import styles from './SubMenuSection.module.scss'





// Types
type Props = PropsWithChildren<{
	label: string
}>





/** @type {React.FunctionComponent} */
export function SubMenuSection(props: Props) {
	const {
		children,
		label,
	} = props

	return (
		<section className={styles['container']}>
			<header className={styles['label']}>
				{label}
			</header>

			<dl className={styles['content']}>
				{children}
			</dl>
		</section>
	)
}
