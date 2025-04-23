// Module imports
import { Button } from '@dying-sun/shared-components'
import { useCallback } from 'react'





// Local imports
import { type CharacterDefinition } from '@/typedefs/CharacterDefinition'

import styles from './CharacterSelectDetails.module.scss'





// Types
type Props = {
	character: CharacterDefinition,
	onPlay: (character: CharacterDefinition) => unknown,
}





/** @type {React.FunctionComponent} */
export function CharacterSelectDetails(props: Props) {
	const {
		character,
		onPlay,
	} = props

	const handleClick = useCallback(() => {
		if (typeof onPlay === 'function') {
			onPlay(character)
		}
	}, [
		character,
		onPlay,
	])

	return (
		<div className={styles['container']}>
			<header className={styles['character-name']}>
				{character.name}
			</header>

			<div>{`Level ${character.level} (${character.xp}xp)`}</div>

			<Button onClick={handleClick}>
				{'Play'}
			</Button>
		</div>
	)
}
