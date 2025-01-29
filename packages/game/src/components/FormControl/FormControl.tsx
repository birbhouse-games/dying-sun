// Module imports
import { type PropsWithChildren } from 'react'





// Local imports
import styles from './FormControl.module.scss'





// Types
type Props = PropsWithChildren<{
	id?: string
	label: string
}>





/** @type {React.FunctionComponent} */
export function FormControl(props: Props) {
	const {
		children,
		id,
		label,
	} = props

	return (
		<>
			<dt className={styles['label-wrapper']}>
				<label
					className={styles['label']}
					htmlFor={id}>
					{label}
				</label>
			</dt>

			<dd className={styles['content-wrapper']}>
				{children}
			</dd>
		</>
	)
}
