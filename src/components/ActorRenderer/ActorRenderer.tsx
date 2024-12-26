// Module imports
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
export function ActorRenderer() {
	const actors = useQuery(Actor, Position)

	return actors.map(actor => (
		<ActorView
			key={actor.id()}
			entity={actor} />
	))
}
