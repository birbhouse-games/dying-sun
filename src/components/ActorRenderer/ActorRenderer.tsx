// Module imports
import { useQuery } from 'koota/react'





// Local imports
import {
	Position,
	Spawner,
} from '@/store/traits'





/**
 * Renders the actors in the scene.
 *
 * @returns The actors in the scene.
 */
export function ActorRenderer() {
	const spawners = useQuery(Spawner, Position)

	return spawners.map(spawner => {
		const position = spawner.get(Position)!

		return (
			<container
				key={spawner.id()}
				x={position.x}
				y={position.y}
				zIndex={100}
			>
				<graphics draw={graphics => {
					// Draw a circle
					graphics.circle(0, 0, 10)
					graphics.fill('red')
				}} />
			</container>
		)
	})
}
