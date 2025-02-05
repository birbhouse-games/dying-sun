// Module imports
import { useTrait } from 'koota/react'





// Local imports
import { AssetRegistry } from '@/store/traits'
import { HUD } from '@/components/HUD/HUD'
import { LevelLoadIndicator } from '@/components/LevelLoadIndicator/LevelLoadIndicator'
import { world } from '@/store/world'

import styles from './UIWrapper.module.scss'





/**
 * Wraps all UI components.
 *
 * @type {React.FunctionComponent}
 */
export function UIWrapper() {
	const {	isLevelLoaded } = useTrait(world, AssetRegistry)!

	return (
		<div className={styles['container']}>
			{!isLevelLoaded && (
				<LevelLoadIndicator />
			)}

			{isLevelLoaded && (
				<HUD />
			)}
		</div>
	)
}
