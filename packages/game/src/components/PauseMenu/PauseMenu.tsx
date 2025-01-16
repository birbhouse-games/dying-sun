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





// Types
interface Props {
	onClose: () => void
}





/**
 * @type {React.FunctionComponent}
 */
export function PauseMenu(props: Props) {
	const { onClose } = props

	const [submenuKey, setSubmenuKey] = useState<'settings' | null>(null)

	const handleSettingsClick = useCallback(() => {
		if (submenuKey === 'settings') {
			setSubmenuKey(null)
		} else {
			setSubmenuKey('settings')
		}
	}, [submenuKey])

	const submenu = useMemo(() => {
		if (submenuKey === 'settings') {
			return (
				<Settings />
			)
		}

		return null
	}, [submenuKey])

	return (
		<Menu
			submenu={submenu}
			title={'Paused'}>
			<ButtonList isFullWidth>
				<Button
					isFullWidth
					onClick={onClose}>
					{'Resume'}
				</Button>

				<Button
					isFullWidth
					onClick={handleSettingsClick}>
					{'Settings'}
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
