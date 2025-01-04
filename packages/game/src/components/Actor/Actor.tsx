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
import { useStore } from 'statery'
import { type With } from 'miniplex'





// Local imports
import { Entity } from '@/typedefs/Entity'





// Constants
const ANCHOR = {
	x: 0.5,
	y: 0.5,
}





/**
 * Renders an actor entity.
 *
 * @component
 * @param entity The Miniplex entity.
 */
export function Actor(entity: With<Entity, 'actorType' | 'attack' | 'bodies' | 'position' | 'velocity' | 'zIndex'>) {
	const {
		currentStageIndex,
		stages,
	} = useStore(entity.attack)
	const {
		x: entityPositionX,
		y: entityPositionY,
	} = useStore(entity.position)
	const {
		x: velocityX,
		y: velocityY,
	} = useStore(entity.velocity)
	const { value: zIndex } = useStore(entity.zIndex)

	const [isFlipped, setIsFlipped] = useState(false)

	const spriteRef = useRef<PixiAnimatedSprite>(null)

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
	}, [entity.actorType])

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

	const spriteScale = useMemo(() => {
		return {
			x: isFlipped ? -1 : 1,
			y: 1,
		}
	}, [isFlipped])

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
				anchor={ANCHOR}
				// @ts-expect-error `animationSpeed` is missing from the Pixi React types.
				animationSpeed={0.15}
				loop={loop}
				scale={spriteScale}
				textures={textures} />
		</container>
	)
}
