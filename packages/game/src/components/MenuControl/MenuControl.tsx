// Module imports
import {
	useCallback,
	useState,
} from 'react'
import { AnimatePresence } from 'motion/react'
import { Button } from '@dying-sun/shared-components'





// Local imports
import { PauseMenu } from '@/components/PauseMenu/PauseMenu'





/** @type {React.FunctionComponent} */
export function MenuControl() {
	const [isOpen, setIsOpen] = useState(false)

	const handleHide = useCallback(() => setIsOpen(false), [])
	const handleShow = useCallback(() => setIsOpen(true), [])

	return (
		<>
			<Button onClick={handleShow}>
				{'Menu'}
			</Button>

			<AnimatePresence mode={'wait'}>
				{isOpen && (
					<PauseMenu
						key={'pause-menu'}
						onClose={handleHide} />
				)}
			</AnimatePresence>
		</>
	)
}
