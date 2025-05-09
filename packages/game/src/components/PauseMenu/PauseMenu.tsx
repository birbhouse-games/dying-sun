// Module imports
import {
	Button,
	ButtonList,
	Menu,
	SceneManager,
} from '@dying-sun/shared-components'
import {
	useCallback,
	useMemo,
	useState,
} from 'react'





// Local imports
import { AccessibilitySubMenu } from '@/components/AccessibilitySubMenu/AccessibilitySubMenu'
import { AudioSubMenu } from '@/components/AudioSubMenu/AudioSubMenu'
import { ControlsSubMenu } from '@/components/ControlsSubMenu/ControlsSubMenu'
import { CurrentUser } from '@/store/traits/CurrentUser'
import { GraphicsSubMenu } from '@/components/GraphicsSubMenu/GraphicsSubMenu'
import { KeybindsSubMenu } from '@/components/KeybindsSubMenu/KeybindsSubMenu'
import { world } from '@/store/world'

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

	const handleSaveAndExit = useCallback(() => {
		SceneManager.activateScene('character-select')
		world.set(CurrentUser, { character: null })
	}, [])

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
				return <AccessibilitySubMenu key={'accessibility-submenu'} />

			case 'audio':
				return <AudioSubMenu key={'audio-submenu'} />

			case 'controls':
				return <ControlsSubMenu key={'controls-submenu'} />

			case 'graphics':
				return <GraphicsSubMenu key={'graphics-submenu'} />

			case 'keybinds':
				return <KeybindsSubMenu key={'keybinds-submenu'} />

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
					onClick={handleSaveAndExit}
					variant={'danger'}>
					{'Exit'}
				</Button>
			</ButtonList>
		</Menu>
	)
}
