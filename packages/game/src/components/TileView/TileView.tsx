// Module imports
import { Entity } from 'koota'
import { memo } from 'react'
import { useTrait } from 'koota/react'



// Local imports
import {
	Position,
	Rendering,
} from '@/store/traits'





/**
 * Renders a tile entities.
 *
 * @component
 * @param entity The entity.
 */
export const TileView = memo(({ entity }: { entity: Entity }) => {
	const rendering = useTrait(entity, Rendering)
	const position = useTrait(entity, Position)


	if (!rendering || !position || !rendering.tile) {
		return null
	}

	return (
		<container
			label={rendering.tile.texture?.label ?? rendering.tile.id.toString()}
			x={position.x}
			y={position.y}
			zIndex={rendering.zIndex}>
			<sprite texture={rendering.tile.texture!} />
		</container>
	)
})

TileView.displayName = 'TileView'
