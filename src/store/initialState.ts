// Module imports
import { Engine } from 'matter-js'
import { World } from 'miniplex'





// Local imports
import { type GlobalState } from '@/typedefs/GlobalState.ts'





export const initialState: GlobalState = {
	areAssetsInitialised: false,
	areBundlesLoaded: false,
	bundles: {},
	isWorldInitialised: false,
  keyboardState: new Map,
	manifest: null,
	physicsEngine: Engine.create({
		gravity: {
			x: 0,
			y: 0,
		},
	}),
	now: 0,
	viewport: {
		height: typeof window !== 'undefined' ? window.innerHeight : 0,
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
	},
	world: new World,
	worldPositionX: 0,
	worldPositionY: 0,
}
