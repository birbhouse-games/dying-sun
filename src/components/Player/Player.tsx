// Module imports
import {
	Assets,
	AnimatedSprite as PixiAnimatedSprite,
	Spritesheet,
} from 'pixi.js'
// import {
// 	useAssets,
// 	useTick,
// } from '@pixi/react'
import {
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { useStore } from 'statery'
import { type With } from 'miniplex'





// Local imports
import { Entity } from '@/typedefs/Entity'





// Constants
// const ASSET_PATHS = ['characters/hero/hero.json']





/**
 * Renders a player entity.
 *
 * @component
 * @param entity The Miniplex entity.
 */
export function Player(entity: With<Entity, 'attack' | 'isPlayer' | 'position' | 'velocity' | 'zIndex'>) {
	const {
		currentStageIndex,
		stages,
	} = useStore(entity.attack)
	const {
		x: positionX,
		y: positionY,
	} = useStore(entity.position)
	const {
		x: velocityX,
		y: velocityY,
	} = useStore(entity.velocity)
	const { value: zIndex } = useStore(entity.zIndex)

	const [isFlipped, setIsFlipped] = useState(false)

	// // const {
	// // 	assets: [
	// // 		heroSpritesheet as Spritesheet,
	// // 	],
	// // 	isError,
	// // 	isPending,
	// // 	isSuccess,
	// // } = useAssets(ASSET_PATHS)

	const spriteRef = useRef<PixiAnimatedSprite>(null)

	const spritesheet = useMemo(() => {
		return Assets.get<Spritesheet>('hero.json')
	}, [])

	const currentStage = useMemo(() => stages?.[currentStageIndex!], [
		currentStageIndex,
		stages,
	])

	const loop = useMemo(() => !currentStage, [currentStage])

	const textures = useMemo(() => {
		if (currentStage) {
			return spritesheet.animations[currentStage.name]
		}

		if (velocityX || velocityY) {
			return spritesheet.animations['run']
		}

		return spritesheet.animations['idle']
	}, [
		currentStage,
		velocityX,
		velocityY,
		spritesheet,
	])

	useEffect(() => {
		if (velocityX === -1) {
			setIsFlipped(true)
		} else if (velocityX === 1) {
			setIsFlipped(false)
		}
	}, [velocityX])

	useEffect(() => {
		if (spriteRef.current) {
			spriteRef.current.play()
		}
	}, [
		currentStage,
		textures,
	])

	return (
		<>
			<container
				label={'player'}
				x={positionX}
				y={positionY}
				zIndex={zIndex}>
				<animatedSprite
					ref={spriteRef}
					anchor={{
						x: 53 / 128,
						y: 42 / 64,
					}}
					// @ts-expect-error `animationSpeed` is missing from the Pixi React types.
					animationSpeed={0.2}
					loop={loop}
					scale={{
						x: isFlipped ? -1 : 1,
						y: 1,
					}}
					textures={textures} />
			</container>
		</>
	)
}
