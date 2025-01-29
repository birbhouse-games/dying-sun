// Module imports
import { type Sound } from '@pixi/sound'
import { trait } from 'koota'





export const AudioRegistry = trait({
	globalVolume: 0.5,
	musicRegistry: {} as Record<string, Sound>,
	musicVolume: 0.5,
	sfxRegistry: {} as Record<string, Sound>,
	sfxVolume: 0.5,
})
