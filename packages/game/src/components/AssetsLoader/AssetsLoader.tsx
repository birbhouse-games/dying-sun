// Module imports
import { useWorld } from 'koota/react'





// Local imports
import { executePromiseWithMinimumDuration } from '@/helpers/executePromiseWithMinimumDuration'
import { loadAssetBundles } from '@/helpers/loadAssetBundles'
import { loadLevel } from '@/helpers/loadLevel'
import { loadManifest } from '@/helpers/loadManifest'





// Types
type Props = {
	onComplete: (...args: unknown[]) => void,
}





// Variables
let promise: Promise<unknown>





/**
 * Parent for all loader components.
 *
 * @component
 */
export function AssetsLoader(props: Props) {
	const { onComplete } = props

	const world = useWorld()

	if (!promise) {
		// eslint-disable-next-line jsdoc/require-jsdoc
		const promiseFunction = async() => {
			await loadManifest(world)
			await loadAssetBundles(world)
			loadLevel(world)
		}

		promise = executePromiseWithMinimumDuration(promiseFunction, 3000)
			.then(onComplete)
	}

	return null
}
