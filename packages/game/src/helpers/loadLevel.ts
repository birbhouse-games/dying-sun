// Module imports
import {
	Common,
	Composite,
} from 'matter-js'
import { Assets } from 'pixi.js'
// @ts-expect-error - `poly-decomp` has no types
import decomp from 'poly-decomp'
import { Tilemap } from 'pixi-tiled-loader'
import { World } from 'koota'





// Local imports
import {
	AssetRegistry,
	PhysicsEngine,
} from '@/store/traits'
import { actions } from './actions'
import { createPhysicsBody } from '@/helpers/createPhysicsBody'
import { getBackgroundsFromTilemap } from '@/helpers/getBackgroundsFromTilemap'
import { getBoundariesFromTilemap } from '@/helpers/getBoundariesFromTilemap'
import { getPropsFromTilemap } from '@/helpers/getPropsFromTilemap'
import { getSpawnPointsFromTilemap } from '@/helpers/getSpawnPointsFromTilemap'





/**
 * Prepares a level for use.
 *
 * @param world The Koota world.
 */
export function loadLevel(world: World) {
	const {
		createPropEntity,
		createSpawnEntity,
		createBackgroundEntity,
	} = actions(world)

	const physicsEngine = world.get(PhysicsEngine)!

	// Set the decomp library for the physics engine
	Common.setDecomp(decomp)

	// Load the tilemap
	const tilemap = Assets.get<Tilemap>('level.tmx')

	// Create prop entities
	for (const prop of getPropsFromTilemap(tilemap)) {
		createPropEntity(...prop)
	}

	// Create background entities
	for (const background of getBackgroundsFromTilemap(tilemap)) {
		createBackgroundEntity(...background)
	}

	// Create spawn entities
	for (const spawnPoint of getSpawnPointsFromTilemap(tilemap)) {
		createSpawnEntity(spawnPoint)
	}

	// Create boundaries
	for (const boundary of getBoundariesFromTilemap(tilemap)) {
		const bodies = [] as Matter.Body[]

		for (const object of boundary) {
			const body = createPhysicsBody(object)
			if (body) {
				bodies.push(body)
			}
		}

		Composite.add(physicsEngine.world, bodies)
	}

	// Set the level as loaded
	world.set(AssetRegistry, { isLevelLoaded: true })
}
