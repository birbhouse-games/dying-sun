// Module imports
import {
	useQueryFirst,
	useTrait,
} from 'koota/react'
import { Entity } from 'koota'

// Local imports
import {
	IsCamera,
	Position,
} from '@/store/traits'
import { BackgroundRenderer } from '@/components/BackgroundRenderer/BackgroundRenderer'
import { EntitiesRenderer } from '@/components/EntitiesRenderer/EntitiesRenderer'




/**
 * World container that owns all subrenderers.
 *
 * @component
 */
export function Renderer() {
	// A little hack to get around useTrait requiring and entity, but in this case it might not exist
	const camera = useQueryFirst(IsCamera, Position) ?? 11111 as Entity
	const position = useTrait(camera, Position)

	if (!position) {
		return null
	}

	return (
		<container
			x={position.x}
			y={position.y}>
			<BackgroundRenderer />
			<EntitiesRenderer />
		</container>
	)
}
