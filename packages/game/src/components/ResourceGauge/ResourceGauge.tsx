// Module imports
import classnames from 'classnames'





// Local imports
import styles from './ResourceGauge.module.scss'





// Types
interface Props {
	className?: string;
	current: number;
	max: number;
	title: string;
}





/**
 * Shows a player resource gauge, e.g. a health bar.
 *
 * @type {React.FunctionComponent}
 */
export function ResourceGauge(props: Props) {
	const {
		className = '',
		current,
		max,
		title,
	} = props

	const compiledClassName = classnames(styles['container'], className)

	return (
		<div className={compiledClassName}>
			<div className={styles['label']}>
				{title}
			</div>

			<div className={styles['value']}>
				<div className={styles['current']}>
					{current}
				</div>

				<div className={styles['max']}>
					{max}
				</div>
			</div>

			<meter
				className={styles['meter']}
				max={max}
				min={0}
				value={current} />
		</div>
	)
}
