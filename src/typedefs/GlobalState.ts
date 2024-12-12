// Module imports
import {
	type AssetsBundle,
	type AssetsManifest,
} from 'pixi.js'
import {
	Engine,
	Render,
} from 'matter-js'
import { World } from 'miniplex'





// Local imports
import { type DefaultAssetsBundle } from '@/typedefs/DefaultAssetsBundle.ts'
import { type Entity } from '@/typedefs/Entity'
import { type KeyboardKeyState } from '@/typedefs/KeyboardKeyState.ts'





export type GlobalState = {
	areAssetsInitialised: boolean,
	areBundlesLoaded: boolean,
	bundles: {
		[key: string]: DefaultAssetsBundle | AssetsBundle | null,
	},
	isWorldInitialised: boolean,
	keyboardState: Map<string, KeyboardKeyState>,
	manifest: AssetsManifest | null,
	now: number,
	physicsEngine: Engine,
	debugRenderers?: Render[],
	viewport: {
		height: number,
		width: number,
	},
	world: World<Entity>,
	worldPositionX: number,
	worldPositionY: number,
}
