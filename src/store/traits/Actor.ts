/* eslint-disable jsdoc/require-jsdoc */
// Module imports
import { trait } from 'koota'





// Local imports
import { ACTOR_CATALOGUE } from '@/constants/ACTOR_CATALOGUE'
import { Composite } from 'matter-js'





export const Actor = trait({
	actorType: 'player' as keyof typeof ACTOR_CATALOGUE,
	bodies: () => Composite.create(),
	health: 0,
	speed: 0,
})

