// Module imports
import {
	type ChangeEventHandler,
	useMemo,
} from 'react'
import classnames from 'classnames'





// Local imports
import { FormControl } from '../FormControl/FormControl'

import styles from './Switch.module.scss'





// Types
type Props = {
	id?: string
	isChecked: boolean,
	isDisabled?: boolean,
	label: string
	onChange?: ChangeEventHandler
}





/** @type {React.FunctionComponent} */
export function Switch(props: Props) {
	const {
		id,
		isChecked,
		isDisabled,
		label,
		onChange,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['container']]: true,
			[styles['is-disabled']]: isDisabled,
		})
	}, [isDisabled])

	const stateString = useMemo(() => {
		return isChecked ? 'On' : 'Off'
	}, [isChecked])

	return (
		<FormControl
			id={id}
			label={label}>
			<div className={compiledClassName}>
				<div className={styles['value']}>
					{stateString}
				</div>

				<input
					checked={isChecked}
					className={styles['input']}
					disabled={isDisabled}
					id={id}
					onChange={onChange}
					type={'checkbox'} />
			</div>
		</FormControl>
	)
}
