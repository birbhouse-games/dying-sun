// Module imports
import { memo } from 'react'
import { useQuery } from 'koota/react'





// Local imports
import {
	Actor,
	Position,
} from '@/store/traits'
import { ActorView } from '@/components/ActorView/ActorView'





/**
 * Renders the actors in the scene.
 *
 * @returns The actors in the scene.
 */
export const ActorRenderer = memo(() => {
	const actors = useQuery(Actor, Position)

	return actors.map(actor => (
		<ActorView
			key={actor.id()}
			entity={actor} />
	))
})

ActorRenderer.displayName = 'ActorRenderer'
