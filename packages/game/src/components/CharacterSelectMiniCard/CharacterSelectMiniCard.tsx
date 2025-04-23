// Module imports
import classnames from 'classnames'
import { useCallback } from 'react'





// Local imports
import { type CharacterDefinition } from '@/typedefs/CharacterDefinition'

import styles from './CharacterSelectMiniCard.module.scss'





// Types
type Props = {
	character: CharacterDefinition,
	isActive?: boolean,
	onClick?: (character: CharacterDefinition) => unknown,
}





/** @type {React.FunctionComponent} */
export function CharacterSelectMiniCard(props: Props) {
	const {
		character,
		isActive,
		onClick,
	} = props

	const compiledClassName = classnames(styles['container'], {
		[styles['is-active']]: isActive,
	})

	const handleClick = useCallback(() => {
		if (typeof onClick === 'function') {
			onClick(character)
		}
	}, [
		character,
		onClick,
	])

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className={compiledClassName}
			onClick={handleClick}
			onKeyUp={handleClick}>
			<header className={styles['character-name']}>
				{character.name}
			</header>

			<div>{`Level ${character.level} (${character.xp}xp)`}</div>
		</div>
	)
}
