// Local imports
import { lerp } from '@/helpers/lerp'
import { type Vector2 } from '@/typedefs/Vector2'





/**
 * Linear interpolation between two vectors.
 *
 * @param a The source vector.
 * @param b The destination vector.
 * @param t The percentage traveled.
 * @returns The current target vector.
 */
export function vLerp(
	a: Vector2,
	b: Vector2,
	t: number,
): Vector2 {
	return {
		x: lerp(a.x, b.x, t),
		y: lerp(a.y, b.y, t),
	}
}
