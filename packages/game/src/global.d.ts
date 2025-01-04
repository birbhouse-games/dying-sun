import { type UnprefixedPixiElements } from '@pixi/react'

declare namespace Matter {
	interface IBodyRenderOptionsSprite {
		xOffset?: number
		yOffset?: number
	}

	interface IRendererOptions {
		wireframeStrokeStyle?: string,
	}
}

declare module 'poly-decomp'

declare module '@pixi/react' {
  interface PixiElements extends UnprefixedPixiElements {}
}
