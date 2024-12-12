// Module imports
import { useStore } from 'statery'





// Local imports
import { BackgroundRenderer } from '@/components/BackgroundRenderer/BackgroundRenderer'
import { EntitiesRenderer } from '@/components/EntitiesRenderer/EntitiesRenderer'
import { store } from '@/store/store'





export function Renderer() {
	const {
		worldPositionX,
		worldPositionY,
	} = useStore(store)

	return (
		<container
			x={worldPositionX}
			y={worldPositionY}>
			<BackgroundRenderer />
			<EntitiesRenderer />
		</container>
	)
}
