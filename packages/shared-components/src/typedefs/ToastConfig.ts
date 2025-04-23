// Module imports
import { type ReactNode } from 'react'
import { type ToastType } from './ToastType'





export interface ToastConfig {
	duration?: number
	message: ReactNode
	type?: ToastType,
}
