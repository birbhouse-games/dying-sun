// Module imports
import { v4 as uuid } from 'uuid'





// Local imports
import { store } from '../store'
import { type ToastConfig } from '../../typedefs/ToastConfig'
import { type ToastData } from '../../typedefs/ToastData'





/**
 * Adds a toast to be displayed by the ToastManager.
 *
 * @param config Configuration for the toast to be displayed.
 */
export function addToast(config: ToastConfig | string) {
	const newToast = {
		duration: 5000,
		id: uuid(),
		type: 'default',
	} as ToastData

	if (typeof config === 'string') {
		newToast.message = config
	} else {
		Object.assign(newToast, config)
	}

	store.set(previousState => ({
		toasts: [
			newToast,
			...previousState.toasts,
		],
	}))

	setTimeout(() => {
		store.set(previousState => ({
			toasts: previousState.toasts.filter(toast => toast.id !== newToast.id),
		}))
	}, newToast.duration)
}
