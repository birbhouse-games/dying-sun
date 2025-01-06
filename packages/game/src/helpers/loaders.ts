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
import {
	getBackgroundsFromTilemap,
	getBoundariesFromTilemap,
	getPropsFromTilemap,
	getSpawnPointsFromTilemap,
} from '@/helpers/tilemapUtils'
import { actions } from './actions'
import { createPhysicsBody } from '@/helpers/createPhysicsBody'





/**
 * Loads the manifest file.
 *
 * @param world The Koota world.
 */
export async function loadManifest(world: World) {
	const response = await fetch('/assets/manifest.json')
	const result = await response.json()
	world.set(AssetRegistry, { manifest: result })
}

/**
 * Parses asset bundles from the manifest and loads all relevant files.
 *
 * @param world The Koota world.
 */
export async function loadAssetBundles(world: World) {
	const assetRegistry = world.get(AssetRegistry)!

	// Initialise bundle registry
	if (assetRegistry.manifest && !assetRegistry.areBundlesInitialised) {
		await Assets.init({
			basePath: '/assets',
			manifest: assetRegistry.manifest,
		})

		assetRegistry.areBundlesInitialised = true

		assetRegistry.bundles = Object.fromEntries(
			assetRegistry.manifest.bundles.map(bundle => [bundle.name, null]),
		)

		world.set(AssetRegistry, assetRegistry)
	}

	// Load bundles
	if (assetRegistry.areBundlesInitialised) {
		for (const bundleName in assetRegistry.bundles) {
			const bundle = await Assets.loadBundle(bundleName)
			assetRegistry.bundles[bundleName] = bundle
		}

		assetRegistry.areBundlesLoaded = true

		world.set(AssetRegistry, assetRegistry)
	}
}

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
