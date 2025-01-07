// Local imports
import { MainPlayerDetails } from '@/components/MainPlayerDetails/MainPlayerDetails'

import styles from './HUD.module.scss'





/**
 * The current player's heads up display.
 *
 * @type {React.FunctionComponent}
 */
export function HUD() {
	return (
		<div className={styles['container']}>
			<MainPlayerDetails />
		</div>
	)
}
