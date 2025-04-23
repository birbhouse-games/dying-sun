// Module imports
import {
	useQueryFirst,
	useTrait,
} from 'koota/react'





// Local imports
import { Actor } from '@/store/traits'
import { CurrentPlayer } from '@/store/traits/CurrentPlayer'
import { CurrentUser } from '@/store/traits/CurrentUser'
import { ResourceGauge } from '@/components/ResourceGauge/ResourceGauge'
import { world } from '@/store/world'

import styles from './MainPlayerDetails.module.scss'





/**
 * Quick stats view for the current player.
 *
 * @type {React.FunctionComponent}
 */
export function MainPlayerDetails() {
	const entity = useQueryFirst(CurrentPlayer, Actor)
	const actorTrait = useTrait(entity, Actor)!
	const currentUser = useTrait(world, CurrentUser)!

	if (!entity || !actorTrait || !currentUser.character) {
		return null
	}

	const { health } = actorTrait

	return (
		<div className={styles['container']}>
			<div className={styles['name']}>
				{currentUser.character.name}
			</div>

			<ResourceGauge
				current={health}
				max={currentUser.character.maxHealth}
				title={'Health'} />
		</div>
	)
}
