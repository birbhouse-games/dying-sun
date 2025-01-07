// Module imports
import { trait } from 'koota'





// Local imports
import { ACTOR_CATALOGUE } from '@/constants/ACTOR_CATALOGUE'
import { Composite } from 'matter-js'





export const Actor = trait({
	actorType: 'hero' as keyof typeof ACTOR_CATALOGUE,
	// eslint-disable-next-line jsdoc/require-jsdoc
	bodies: () => Composite.create(),
	health: 0,
	speed: 0,
})
