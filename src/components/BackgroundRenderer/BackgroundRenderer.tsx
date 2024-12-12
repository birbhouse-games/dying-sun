// Module imports
import {
	memo,
	useMemo,
} from 'react'
import { Assets } from 'pixi.js'
import { type Tilemap } from 'pixi-tiled-loader'





// Local imports
import { LayerRenderer } from '@/components/LayerRenderer/LayerRenderer'





export const BackgroundRenderer = memo(() => {
	const tilemap = useMemo(() => Assets.get<Tilemap>('level.tmx'), [])

	const mappedLayers = useMemo(() => {
		const { layers } = tilemap

		return layers.map((layer, index) => (
			<LayerRenderer
				key={index}
				layer={layer}
				tilemap={tilemap} />
		))
	}, [tilemap])

	return (
		<container label={'background'}>
			{mappedLayers}
		</container>
	)
})

BackgroundRenderer.displayName = 'BackgroundRenderer'
