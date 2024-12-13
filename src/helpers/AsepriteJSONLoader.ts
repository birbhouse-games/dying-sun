// Module imports
import {
	checkExtension,
	ExtensionType,
	type LoaderParser,
	LoaderParserPriority,
	type SpritesheetData,
	type SpriteSheetJson,
} from 'pixi.js'





// Constants
const EXTENSION_NAME = 'AsepriteJSONLoader'





export const AsepriteJSONLoader = {
	name: EXTENSION_NAME,

	extension: {
		name: EXTENSION_NAME,
		priority: LoaderParserPriority.High,
		type: ExtensionType.LoadParser,
	},

	/**
	 * Tests an asset to see if it should be parsed by this loader.
	 *
	 * @param asset The asset to be tested.
	 * @param options Additional options.
	 * @returns Whether the asset should be parsed by this loader.
	 */
	// eslint-disable-next-line require-await
	async testParse(asset, options) {
		if (!options?.src) {
			return false
		}

		if (!checkExtension(options.src, '.json')) {
			return false
		}

		const typedAsset = asset as SpriteSheetJson

		if (!('app' in typedAsset.meta) || typeof typedAsset.meta.app !== 'string') {
			return false
		}

		return /^https?:\/\/(?:www\.)?aseprite\.org\/$/iu.test(typedAsset.meta.app)
	},

	/**
	 * Parses an asset.
	 *
	 * @param asset The asset to be parsed.
	 * @returns The parsed asset.
	 */
	// eslint-disable-next-line require-await
	async parse(asset): Promise<SpritesheetData> {
		const typedAsset = asset as SpritesheetData

		const frameKeys = Object.keys(typedAsset.frames)

		if (typedAsset.meta.frameTags) {
			if (!typedAsset.animations) {
				typedAsset.animations = {}
			}

			for (const tag of typedAsset.meta.frameTags) {
				const frames = []

				let index = tag.from

				while (index <= tag.to) {
					frames.push(frameKeys[index])
					index += 1
				}

				typedAsset.animations[tag.name] = frames
			}
		}

		return typedAsset
	},
} satisfies LoaderParser<unknown | unknown[]>
