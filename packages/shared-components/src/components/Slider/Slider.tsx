// Module imports
import {
	type ChangeEventHandler,
	useMemo,
} from 'react'
import classnames from 'classnames'
import { motion } from 'motion/react'





// Local imports
import { FormControl } from '../FormControl/FormControl'

import styles from './Slider.module.scss'





// Types
type Props = {
	id?: string
	isDisabled?: boolean
	label: string
	max?: number
	min?: number
	onChange?: ChangeEventHandler
	step?: number
	value: number | string
}





/** @type {React.FunctionComponent} */
export function Slider(props: Props) {
	const {
		id,
		isDisabled,
		label,
		max = 100,
		min = 0,
		onChange,
		step = 1,
		value,
	} = props

	const numberValue = typeof value === 'number' ? value : parseInt(value, 10)

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['container']]: true,
			[styles['is-disabled']]: isDisabled,
		})
	}, [isDisabled])

	const valueArray = numberValue
		.toString()
		.split('')

	return (
		<FormControl
			id={id}
			label={label}>
			<div className={compiledClassName}>
				<motion.input
					className={styles['input']}
					disabled={isDisabled}
					id={id}
					max={max}
					min={min}
					onChange={onChange}
					step={step}
					type={'range'}
					value={numberValue} />

				<div className={styles['value']}>
					{(valueArray.length < 3) && (
						<span className={styles['padding']}>
							{Array(3 - valueArray.length).fill('0').join('')}
						</span>
					)}

					<span>
						{numberValue}
					</span>
				</div>
			</div>
		</FormControl>
	)
}
