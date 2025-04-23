// Local imports
import { type CharacterDefinition } from '@/typedefs/CharacterDefinition'





// Constants
const HEALTH_PER_LEVEL = 100
const BASE_XP_PER_LEVEL = 10000





/** Temporary hardcoded character list for the user. */
export const CHARACTERS= [
	{
		level: 1,
		name: 'Derek',
	},
	{
		level: 2,
		name: 'Ben',
	},
	{
		level: 3,
		name: 'Deuteronimusgang',
	},
].map(characterBase => {
	return {
		...characterBase,
		id: String(characterBase.level),
		maxHealth: HEALTH_PER_LEVEL * characterBase.level,
		xp: (BASE_XP_PER_LEVEL * characterBase.level) + Math.floor(BASE_XP_PER_LEVEL * Math.random()),
	} as CharacterDefinition
})
