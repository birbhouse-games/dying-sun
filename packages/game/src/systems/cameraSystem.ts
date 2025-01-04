// Module imports
// import {
// 	Bounds,
// 	Render,
// } from 'matter-js'





// Local imports
// import { ECS } from '@/helpers/ECS';
// import { store } from '@/store/store'





// Constants
// const PLAYER_ENTITIES = ECS.world.with('bodies', 'isPlayer')





/** Moves the camera based to follow the player character. */
export function cameraSystem() {
	// store.state.debugRenderers?.forEach(renderer => {
	// 	Bounds.translate(renderer.bounds, {
	// 		x: 0.04,
	// 		y: 0,
	// 	})
	// 	Render.lookAt(renderer, renderer.bounds)
	// })

	// store.set(previousState => {
	// 	return {
	// 		worldPositionX: previousState.worldPositionX - 0.04,
	// 	}
	// })

	// for (const entity of PLAYER_ENTITIES) {
	// 	// entity
	// }

	// const {
	// 	playerPositionX,
	// 	playerPositionY,
	// 	viewport,
	// 	worldPositionX,
	// 	worldPositionY,
	// } = previousState

	// const screenCenterX = worldPositionX + (viewport.width / 2)
	// const screenCenterY = worldPositionY + (viewport.height / 2)

	// if (playerPositionX > (screenCenterX + MOVE_ALLOWANCE_X)) {
	// 	result.worldPositionX = worldPositionX - (playerPositionX - (screenCenterX + MOVE_ALLOWANCE_X))
	// } else if (playerPositionX < (screenCenterX - MOVE_ALLOWANCE_X)) {
	// 	result.worldPositionX = worldPositionX + ((screenCenterX + MOVE_ALLOWANCE_X) - playerPositionX)
	// }
}
