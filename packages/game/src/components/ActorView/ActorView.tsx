// Module imports
import {
	Assets,
	AnimatedSprite as PixiAnimatedSprite,
	Spritesheet,
} from 'pixi.js'
import {
	memo,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { Composite } from 'matter-js'
import { Entity } from 'koota'
import { useTrait } from 'koota/react'





// Local imports
import {
	Actor,
	Attacker,
	Position,
	Rendering,
	Velocity,
} from '@/store/traits'





// Constants
const ANCHOR = {
	x: 0.5,
	y: 0.5,
}





/**
 * Renders an actor entity.
 *
 * @component
 * @param {Entity} entity - The entity.
 */
export const ActorView = memo(({ entity }: { entity: Entity }) => {
	const spriteRef = useRef<PixiAnimatedSprite>(null)

	// Get actor state
	const {
		actorType,
		bodies,
	} = useTrait(entity, Actor)!

	// Get attacker state
	const {
		currentStageIndex,
		stages,
	} = useTrait(entity, Attacker)!

	// Get position state
	const {
		x: entityPositionX,
		y: entityPositionY,
	} = useTrait(entity, Position)!

	// Get velocity state
	const {
		x: velocityX,
		y: velocityY,
	} = useTrait(entity, Velocity)!

	// Get rendering state
	const { zIndex } = useTrait(entity, Rendering)!

	const [isFlipped, setIsFlipped] = useState(false)

	const position = useMemo(() => {
		const collider = Composite
			.allBodies(bodies)
			.find(body => body.label === 'collider')

		return {
			// @ts-expect-error - xOffset is missing from the Matter.js types.
			x: entityPositionX + ((collider?.render.sprite?.xOffset ?? 0) * (isFlipped ? -1 : 1)),
			// @ts-expect-error - yOffset is missing from the Matter.js types.
			y: entityPositionY + (collider?.render.sprite?.yOffset ?? 0),
		}
	}, [bodies, entityPositionX, entityPositionY, isFlipped])

	const spritesheet = useMemo(() => {
		return Assets.get<Spritesheet>(`/assets/characters/${actorType}/${actorType}.json`)
	}, [actorType])

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
			label={`actor::${actorType}`}
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
})

ActorView.displayName = 'ActorView'
