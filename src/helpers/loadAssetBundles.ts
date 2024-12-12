// Module imports
import { Assets } from 'pixi.js'





// Local imports
import { store } from '@/store/store'





export async function loadAssetBundles() {
	if (store.state.manifest && !store.state.areAssetsInitialised) {
		await Assets.init({
			basePath: '/assets',
			manifest: store.state.manifest,
		})

		store.set(previousState => ({
			areAssetsInitialised: true,
			bundles: store.state.manifest!.bundles.reduce((accumulator, bundle) => {
				if (!(bundle.name in accumulator)) {
					accumulator[bundle.name] = null
				}

				return accumulator
			}, { ...previousState.bundles }),
		}))
	}

	if (store.state.areAssetsInitialised) {
		for (const bundleName in store.state.bundles) {
			const bundle = await Assets.loadBundle(bundleName)

			store.set(previousState => ({
				bundles: {
					...previousState.bundles,
					[bundleName]: bundle,
				},
			}))
		}

		store.set(() => ({ areBundlesLoaded: true }))
	}
}
