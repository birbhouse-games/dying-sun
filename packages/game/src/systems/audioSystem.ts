// Module imports
import { Assets } from 'pixi.js'





// Local imports
import { AudioRegistry } from '@/store/traits/AudioRegistry'
import { type SystemRunner } from '@/typedefs/SystemRunner'
import { world } from '@/store/world'





/** Plays sounds when appropriate. */
export const audioSystem: SystemRunner = function audioSystem() {
	const {
		isMusicEnabled,
		musicRegistry,
		musicVolume,
	} = world.get(AudioRegistry)!

	let backgroundMusic = musicRegistry.backgroundMusic

	if (!backgroundMusic) {
		backgroundMusic = Assets.get('audio/main-theme')!
		musicRegistry.backgroundMusic = backgroundMusic
		backgroundMusic.volume = isMusicEnabled ? musicVolume : 0
		backgroundMusic.play({ loop: true })
	}
}
