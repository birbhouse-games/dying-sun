// Module imports
import { type CharacterDefinition } from '@/typedefs/CharacterDefinition'
import { trait } from 'koota'





export const CurrentUser = trait({
	character: null as CharacterDefinition | null,
	userID: null as string | null,
})
