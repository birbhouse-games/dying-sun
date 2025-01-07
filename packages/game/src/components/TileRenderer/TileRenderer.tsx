// Module imports
import { memo } from 'react'
import { useQuery } from 'koota/react'





// Local imports
import {
	Position,
	Rendering,
} from '@/store/traits'
import { TileView } from '@/components/TileView/TileView'





/**
 * Renders all tiles in the scene.
 *
 * @component
 */
export const TileRenderer = memo(() => {
	const tiles = useQuery(Position, Rendering)

	return tiles.map(tile => (
		<TileView
			key={tile.id()}
			entity={tile} />
	))
})

TileRenderer.displayName = 'TileRenderer'
