// Module imports
import {
	useCallback,
	useMemo,
	useState,
} from 'react'





// Local imports
import { Button } from '@/components/Button/Button'
import { ButtonList } from '@/components/ButtonList/ButtonList'
import { Menu } from '@/components/Menu/Menu'
import { Settings } from '@/components/Settings/Settings'

import styles from './PauseMenu.module.scss'





// Types
interface Props {
	onClose: () => void
}
type SubMenuKey = 'accessibility' | 'audio' | 'controls' | 'graphics' | 'keybinds' | null





/**
 * @type {React.FunctionComponent}
 */
export function PauseMenu(props: Props) {
	const { onClose } = props

	const [submenuKey, setSubmenuKey] = useState<SubMenuKey>(null)

	const handleSubMenuOpen = useCallback((newMenuKey: SubMenuKey) => () => {
		if (submenuKey === newMenuKey) {
			setSubmenuKey(null)
		} else {
			setSubmenuKey(newMenuKey)
		}
	}, [submenuKey])

	const submenu = useMemo(() => {
		switch (submenuKey) {
			case 'accessibility':
				return <Settings key={'accessibility-submenu'} />

			case 'audio':
				return <Settings key={'audio-submenu'} />

			case 'controls':
				return <Settings key={'controls-submenu'} />

			case 'graphics':
				return <Settings key={'graphics-submenu'} />

			case 'keybinds':
				return <Settings key={'keybinds-submenu'} />

			default:
				return null
		}
	}, [submenuKey])

	return (
		<Menu
			className={styles['container']}
			label={'Paused'}
			submenu={submenu}>
			<ButtonList isFullWidth>
				<Button
					isFullWidth
					onClick={handleSubMenuOpen('graphics')}>
					{'Graphics'}
				</Button>

				<Button
					isFullWidth
					onClick={handleSubMenuOpen('audio')}>
					{'Audio'}
				</Button>

				<Button
					isFullWidth
					onClick={handleSubMenuOpen('controls')}>
					{'Controls'}
				</Button>

				<Button
					isFullWidth
					onClick={handleSubMenuOpen('keybinds')}>
					{'Keybinds'}
				</Button>

				<Button
					isFullWidth
					onClick={handleSubMenuOpen('accessibility')}>
					{'Accessibility'}
				</Button>
			</ButtonList>

			<ButtonList
				className={styles['bottom']}
				isFullWidth>
				<Button
					isFullWidth
					onClick={onClose}>
					{'Resume'}
				</Button>

				<Button
					isFullWidth
					variant={'danger'}>
					{'Exit'}
				</Button>
			</ButtonList>
		</Menu>
	)
}
