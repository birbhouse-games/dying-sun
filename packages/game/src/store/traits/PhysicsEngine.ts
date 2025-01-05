// Module imports
import { Engine } from 'matter-js'
import { trait } from 'koota'





export const PhysicsEngine = trait(() => Engine.create({
	gravity: {
		x: 0,
		y: 0,
	},
}))
