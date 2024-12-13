// Module imports
import {
	type GroupLayer,
	type Layer,
	type ObjectLayer,
	type Tilemap,
} from 'pixi-tiled-loader'
import { type ReactNode } from 'react'





// Local imports
import { Tile } from '@/components/Tile/Tile'





// Types
type Props = {
	layer: GroupLayer | Layer | ObjectLayer,
	tilemap: Tilemap,
}





/**
 * Renders an individual layer. Mostly limited to background layers.
 *
 * @component
 */
export function LayerRenderer(props: Props) {
	const {
		layer,
		tilemap,
	} = props

	if (layer.type === 'object') {
		return null
	}

	if (layer.type === 'group') {
		return (
			<container
				key={layer.name}
				label={layer.name}>
				{layer.layers.map((childLayer, index) => (
					<LayerRenderer
						key={index}
						layer={childLayer}
						tilemap={tilemap} />
				))}
			</container>
		)
	}

	const tilesets = Object
		.values(tilemap.tilesets)
		.reverse()

	if (layer.metadata.name.toLowerCase() === 'entities') {
		return null
	}

	const tiles: ReactNode[] = []

	let cellCoordinates: `${string}|${string}`

	for (cellCoordinates in layer.data.cells) {
		const cell = layer.data.cells[cellCoordinates]
		const tilesetDefinition = tilesets.find(tilesetData => tilesetData.firstGid <= cell.id)!
		const tileset = tilesetDefinition.tileset!

		tiles.push((
			<Tile
				key={cellCoordinates}
				tile={tileset.tiles[cell.id - tilesetDefinition.firstGid]}
				x={cell.x * tilemap.metadata.tileWidth}
				y={cell.y * tilemap.metadata.tileHeight} />
		))
	}

	return (
		<container
			key={layer.metadata.id}
			label={layer.metadata.name}>
			{tiles}
		</container>
	)
}
