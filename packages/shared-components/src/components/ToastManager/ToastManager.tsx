// Module imports
import { AnimatePresence } from 'motion/react'
import { useStore } from 'statery'





// Local imports
import { addToast } from '../../store/actions/addToast'
import { store } from '../../store/store'
import { Toast } from '../Toast/Toast'

import styles from './ToastManager.module.scss'





/**
 * @type {React.FunctionComponent}
 */
export function ToastManager() {
	const { toasts } = useStore(store)

	return (
		<div className={styles['container']}>
			<AnimatePresence>
				{toasts.map(toast => (
					<Toast
						key={toast.id}
						toast={toast} />
				))}
			</AnimatePresence>
		</div>
	)
}

ToastManager.addToast = addToast
