// Module imports
import {
	Scene,
	SceneManager,
} from '@dying-sun/shared-components'
import {
	useCallback,
	useState,
} from 'react'





// Local imports
import { type CharacterDefinition } from '@/typedefs/CharacterDefinition'
import { CHARACTERS } from '@/constants/CHARACTERS'
import { CharacterSelectDetails } from '@/components/CharacterSelectDetails/CharacterSelectDetails'
import { CharacterSelectMiniCard } from '@/components/CharacterSelectMiniCard/CharacterSelectMiniCard'
import { CurrentUser } from '@/store/traits/CurrentUser'
import { world } from '@/store/world'

import styles from './CharacterSelectScene.module.scss'





/**
 * The loading scene.
 *
 * @type {React.FunctionComponent}
 */
export function CharacterSelectScene() {
	const [selectedCharacter, setSelectedCharacter] = useState<CharacterDefinition | null>(null)

	const handlePlay= useCallback((character: CharacterDefinition) => {
		world.set(CurrentUser, { character })
		try {
			SceneManager.activateScene('game')
		} catch (error) {
			console.error(error)
		}
	}, [])

	const handleSelectCharacter= useCallback((character: CharacterDefinition) => {
		if (character === selectedCharacter) {
			setSelectedCharacter(null)
		} else {
			setSelectedCharacter(character)
		}
	}, [selectedCharacter])

	return (
		<Scene
			className={styles['container']}
			name={'character-select'}>
			<div className={styles['character-list']}>
				{CHARACTERS.map(character => (
					<CharacterSelectMiniCard
						key={character.id}
						character={character}
						isActive={character === selectedCharacter}
						onClick={handleSelectCharacter} />
				))}
			</div>

			{!!selectedCharacter && (
				<CharacterSelectDetails
					character={selectedCharacter}
					onPlay={handlePlay} />
			)}
		</Scene>
	)
}
