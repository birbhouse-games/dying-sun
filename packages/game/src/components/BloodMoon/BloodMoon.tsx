// Module imports
import {
	Assets,
	AnimatedSprite as PixiAnimatedSprite,
	Spritesheet,
} from 'pixi.js'
import {
	useEffect,
	useMemo,
	useRef,
} from 'react'
import { useApplication } from '@pixi/react'
import { useTrait } from 'koota/react'





// Local imports
import { Viewport } from '@/store/traits'
import { world } from '@/store/world'





// Constants
const ANCHOR = {
	x: 0.5,
	y: 0.5,
}





/**
 * Renders the blood moon in the background.
 *
 * @type {React.FunctionComponent}
 */
export function BloodMoon() {
	const { app } = useApplication()

	const viewport = useTrait(world, Viewport)!

	const spriteRef = useRef<PixiAnimatedSprite>(null)

	const positionX = useMemo(() => {
		return viewport.width / app.stage.scale.x / 2
	}, [
		app,
		viewport,
	])

	const spritesheet = useMemo(() => {
		return Assets.get<Spritesheet>('/assets/tilesets/props/blood-moon.json')
	}, [])

	const textures = useMemo(() => {
		return spritesheet.animations['idle']
	}, [spritesheet])

	useEffect(() => {
		if (spriteRef.current) {
			spriteRef.current.play()
		}
	}, [])

	return (
		<container
			alpha={0.2}
			x={positionX}
			y={48}>
			<animatedSprite
				ref={spriteRef}
				anchor={ANCHOR}
				// @ts-expect-error `animationSpeed` is missing from the Pixi React types.
				animationSpeed={0.15}
				loop
				textures={textures} />
		</container>
	)
}
