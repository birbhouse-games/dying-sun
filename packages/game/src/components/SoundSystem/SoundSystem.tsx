// Module imports
import {
	useEffect,
	useState,
} from 'react'
import { sound } from '@pixi/sound'
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
		isMusicEnabled,
		isSFXEnabled,
		musicRegistry,
		musicVolume,
		sfxRegistry,
		sfxVolume,
	} = useTrait(world, AudioRegistry)!

	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (isLoaded) {
			sound.volumeAll = globalVolume
			localStorage.setItem('globalVolume', JSON.stringify(globalVolume))
		}
	}, [
		globalVolume,
		isLoaded,
	])

	useEffect(() => {
		if (isLoaded) {
			for (const soundItem of Object.values(musicRegistry)) {
				soundItem.volume = isMusicEnabled ? musicVolume : 0
			}

			localStorage.setItem('isMusicEnabled', JSON.stringify(isMusicEnabled))
			localStorage.setItem('musicVolume', JSON.stringify(musicVolume))
		}
	}, [
		isLoaded,
		isMusicEnabled,
		musicRegistry,
		musicVolume,
	])

	useEffect(() => {
		if (isLoaded) {
			if (isSFXEnabled) {
				for (const soundItem of Object.values(sfxRegistry)) {
					soundItem.volume = isSFXEnabled ? sfxVolume : 0
				}
			}

			localStorage.setItem('isSFXEnabled', JSON.stringify(isSFXEnabled))
			localStorage.setItem('sfxVolume', JSON.stringify(sfxVolume))
		}
	}, [
		isLoaded,
		isSFXEnabled,
		sfxRegistry,
		sfxVolume,
	])

	useEffect(() => {
		if (!isLoaded) {
			world.set(AudioRegistry, {
				globalVolume: JSON.parse(localStorage.getItem('globalVolume') ?? '0.8'),
				isMusicEnabled: JSON.parse(localStorage.getItem('isMusicEnabled') ?? 'true'),
				isSFXEnabled: JSON.parse(localStorage.getItem('isSFXEnabled') ?? 'true'),
				musicVolume: JSON.parse(localStorage.getItem('musicVolume') ?? '0.8'),
				sfxVolume: JSON.parse(localStorage.getItem('sfxVolume') ?? '0.8'),
			})
			setIsLoaded(true)
		}
	}, [isLoaded])

	return null
}
