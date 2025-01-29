// Module imports
import { sound } from '@pixi/sound'
import { useEffect } from 'react'
import { useTrait } from 'koota/react'





// Local imports
import { AudioRegistry } from '@/store/traits/AudioRegistry'
import { world } from '@/store/world'





/**
 * Reactively updates @pixi/sound volumes.
 *
 * @type {React.FunctionComponent}
 */
export function SoundSystem() {
	const {
		globalVolume,
		musicRegistry,
		musicVolume,
		sfxRegistry,
		sfxVolume,
	} = useTrait(world, AudioRegistry)!

	useEffect(() => {
		sound.volumeAll = globalVolume
	}, [globalVolume])

	useEffect(() => {
		for (const soundItem of Object.values(musicRegistry)) {
			soundItem.volume = musicVolume
		}
	}, [
		musicRegistry,
		musicVolume,
	])

	useEffect(() => {
		for (const soundItem of Object.values(sfxRegistry)) {
			soundItem.volume = sfxVolume
		}
	}, [
		sfxRegistry,
		sfxVolume,
	])

	return null
}
