// Module imports
import {
	useQueryFirst,
	useTrait,
} from 'koota/react'





// Local imports
import {
	IsCamera,
	Position,
} from '@/store/traits'
import { ActorRenderer } from '../ActorRenderer/ActorRenderer'
import { TileRenderer } from '@/components/TileRenderer/TileRenderer'





/**
 * World container that owns all subrenderers.
 *
 * @component
 */
export function Renderer() {
	const camera = useQueryFirst(IsCamera, Position)
	const position = useTrait(camera, Position)

	if (!position) {
		return null
	}

	return (
		<container
			x={position.x}
			y={position.y}>
			<TileRenderer />
			<ActorRenderer />
		</container>
	)
}
