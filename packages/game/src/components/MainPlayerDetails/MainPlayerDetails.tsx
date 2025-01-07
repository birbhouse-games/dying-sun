// Module imports
import {
	useQueryFirst,
	useTrait,
} from 'koota/react'





// Local imports
import { Actor } from '@/store/traits'
import { CurrentPlayer } from '@/store/traits/CurrentPlayer'
import { ResourceGauge } from '@/components/ResourceGauge/ResourceGauge'

import styles from './MainPlayerDetails.module.scss'





/**
 * Quick stats view for the current player.
 *
 * @type {React.FunctionComponent}
 */
export function MainPlayerDetails() {
	const entity = useQueryFirst(CurrentPlayer, Actor)
	const actorTrait = useTrait(entity, Actor)!

	if (!entity || !actorTrait) {
		return null
	}

	const { health } = actorTrait

	return (
		<div className={styles['container']}>
			<div className={styles['name']}>
				{'Character Name'}
			</div>

			<ResourceGauge
				current={health}
				max={100}
				title={'Health'} />
		</div>
	)
}
