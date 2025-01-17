// Local imports
import { MenuControl } from '@/components/MenuControl/MenuControl'

import styles from './MetaControls.module.scss'





/**
 * Game controls not related to in-game.
 *
 * @type {React.FunctionComponent}
 */
export function MetaControls() {
	return (
		<div className={styles['container']}>
			<MenuControl />
		</div>
	)
}
