// Module imports
import {
	type ChangeEventHandler,
	useCallback,
} from 'react'
import { useTrait } from 'koota/react'





// Local imports
import { AudioRegistry } from '@/store/traits/AudioRegistry'
import { Slider } from '@/components/Slider/Slider'
import { SubMenu } from '@/components/SubMenu/SubMenu'
import { SubMenuSection } from '@/components/SubMenuSection/SubMenuSection'
import { Switch } from '@/components/Switch/Switch'
import { world } from '@/store/world'





// Constants
const MAIN_VOLUME_ID = 'main-volume'
const MUSIC_ENABLED_ID = 'music-enabled'
const MUSIC_VOLUME_ID = 'music-volume'
const SFX_ENABLED_ID = 'sfx-enabled'
const SFX_VOLUME_ID = 'sfx-volume'





/** @type {React.FunctionComponent} */
export function AudioSubMenu() {
	const {
		globalVolume,
		isMusicEnabled,
		isSFXEnabled,
		musicVolume,
		sfxVolume,
	} = useTrait(world, AudioRegistry)!

	const handleGlobalVolumeChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
		world.set(AudioRegistry, {
			globalVolume: Number(event.target.value) * 0.01,
		})
	}, [])

	const handleIsMusicEnabledChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
		world.set(AudioRegistry, {
			isMusicEnabled: event.target.checked,
		})
	}, [])

	const handleMusicVolumeChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
		world.set(AudioRegistry, {
			musicVolume: Number(event.target.value) * 0.01,
		})
	}, [])

	const handleIsSFXEnabledChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
		world.set(AudioRegistry, {
			isSFXEnabled: event.target.checked,
		})
	}, [])

	const handleSFXVolumeChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
		world.set(AudioRegistry, {
			sfxVolume: Number(event.target.value) * 0.01,
		})
	}, [])

	return (
		<SubMenu label={'Audio'}>
			<SubMenuSection label={'Global'}>
				<Slider
					id={MAIN_VOLUME_ID}
					label={'Volume'}
					onChange={handleGlobalVolumeChange}
					value={(globalVolume * 100).toFixed()} />
			</SubMenuSection>

			<SubMenuSection label={'Music'}>
				<Switch
					id={MUSIC_ENABLED_ID}
					isChecked={isMusicEnabled}
					label={'Enabled'}
					onChange={handleIsMusicEnabledChange} />

				<Slider
					id={MUSIC_VOLUME_ID}
					isDisabled={!isMusicEnabled}
					label={'Volume'}
					onChange={handleMusicVolumeChange}
					value={(musicVolume * 100).toFixed()} />
			</SubMenuSection>

			<SubMenuSection label={'SFX'}>
				<Switch
					id={SFX_ENABLED_ID}
					isChecked={isSFXEnabled}
					label={'Enabled'}
					onChange={handleIsSFXEnabledChange} />

				<Slider
					id={SFX_VOLUME_ID}
					isDisabled={!isSFXEnabled}
					label={'Volume'}
					onChange={handleSFXVolumeChange}
					value={(sfxVolume * 100).toFixed()} />
			</SubMenuSection>
		</SubMenu>
	)
}
