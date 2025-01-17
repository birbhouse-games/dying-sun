// Module imports
import {
	useCallback,
	useState,
} from 'react'
import { AnimatePresence } from 'motion/react'





// Local imports
import { Button } from '@/components/Button/Button'
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
