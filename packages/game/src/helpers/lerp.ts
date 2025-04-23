/**
 * Linear interpolation between two points.
 *
 * @param a The source point.
 * @param b The destination point.
 * @param t The percentage traveled.
 * @returns The current target point.
 */
export function lerp(
	a: number,
	b: number,
	t: number,
) {
	return a + t * (b - a)
}
