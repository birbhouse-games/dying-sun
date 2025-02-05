// Local imports
import styles from './LevelLoadIndicator.module.scss'





/**
 * Shown while a level is loading.
 *
 * @type {React.FunctionComponent}
 */
export function LevelLoadIndicator() {
	return (
		<div className={styles['container']}>
			<div className={styles['indicator']}>
				{'Loading...'}
			</div>
		</div>
	)
}
