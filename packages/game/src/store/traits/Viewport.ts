// Module imports
import { trait } from 'koota'





export const Viewport = trait({
	height: typeof window !== 'undefined' ? window.innerHeight : 0,
	width: typeof window !== 'undefined' ? window.innerWidth : 0,
})
