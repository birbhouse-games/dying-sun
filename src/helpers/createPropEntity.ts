// Module imports
import {
	type Cell,
	type GridTile,
	type ImageTile,
	type Tilemap,
} from 'pixi-tiled-loader'
import { Composite } from 'matter-js'
import { makeStore } from 'statery'





// Local imports
import { createObjectBody } from '@/helpers/createObjectBody'
import { ECS } from '@/helpers/ECS'
import { store } from '@/store/store'





/**
 * Creates the Miniplex entity and Matter.js bodies for a prop.
 *
 * @param cell The cell within a tilemap.
 * @param tile The tile within a tileset.
 * @param tilemap The tilemap to which this prop belongs.
 */
export function createPropEntity(cell: Cell, tile: GridTile | ImageTile, tilemap: Tilemap) {
	const { physicsEngine } = store.state

	const tileX = cell.x * tilemap.metadata.tileWidth
	const tileY = (cell.y * tilemap.metadata.tileHeight) - (tile.height - tilemap.metadata.tileHeight)

	const zOffsetProperty = tile.customProperties?.zOffset

	const entity = ECS.world.add({
		bodies: Composite.create(),
		isProp: true,
		position: makeStore({
			x: tileX,
			y: tileY,
		}),
		tile,
		zIndex: makeStore({ value: 0 }),
		zOffset: zOffsetProperty?.type === 'int' ? zOffsetProperty.value : 0,
	})

	if (tile.objectGroups) {
		for (const objectGroup of tile.objectGroups) {
			for (const object of objectGroup.objects) {
				const collider = createObjectBody(object, tileX, tileY)

				if (collider) {
					Composite.add(entity.bodies, collider)
				}
			}
		}

		Composite.add(physicsEngine.world, entity.bodies)
	}
}
