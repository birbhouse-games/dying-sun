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
	useState,
} from 'react'
import { Composite } from 'matter-js'
import { Entity } from 'koota'
import { useTrait } from 'koota/react'





// Local imports
import { Position, Rendering, Velocity } from '@/store/traits'





/**
 * Renders an actor entity.
 *
 * @component
 * @param entity The entity.
 */
export function ActorView({ entity }: { entity: Entity }) {
	const spriteRef = useRef<PixiAnimatedSprite>(null)

	// const {
	// 	currentStageIndex,
	// 	stages,
	// } = useStore(entity.attack)

	const {
		x: entityPositionX,
		y: entityPositionY,
	} = useTrait(entity, Position)!

	const {
		x: velocityX,
		y: velocityY,
	} = useTrait(entity, Velocity)!

	const { zIndex } = useTrait(entity, Rendering)!

	const [isFlipped, setIsFlipped] = useState(false)

	const position = useMemo(() => {
		const collider = Composite
			.allBodies(entity.bodies)
			.find(body => body.label === 'collider')

		return {
			// @ts-expect-error xOffset is missing from the Matter.js types.
			x: entityPositionX + ((collider?.render.sprite?.xOffset ?? 0) * (isFlipped ? -1 : 1)),
			// @ts-expect-error yOffset is missing from the Matter.js types.
			y: entityPositionY + (collider?.render.sprite?.yOffset ?? 0),
		}
	}, [
		entity,
		entityPositionX,
		entityPositionY,
		isFlipped,
	])

	const spritesheet = useMemo(() => {
		return Assets.get<Spritesheet>(`/assets/characters/${entity.actorType}/${entity.actorType}.json`)
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
			return spritesheet.animations['move']
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
		<container
			label={`actor::${entity.actorType}`}
			x={position.x}
			y={position.y}
			zIndex={zIndex}>
			<animatedSprite
				ref={spriteRef}
				anchor={{
					x: 0.5,
					y: 0.5,
				}}
				// @ts-expect-error `animationSpeed` is missing from the Pixi React types.
				animationSpeed={0.15}
				loop={loop}
				scale={{
					x: isFlipped ? -1 : 1,
					y: 1,
				}}
				textures={textures} />
		</container>
	)
}
