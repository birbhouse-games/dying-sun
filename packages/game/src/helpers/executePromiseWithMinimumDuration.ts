// Types
type PromiseFunction<T> = (...args: Array<unknown>) => Promise<T>





/**
 * Executes a promise, preventing resolution until after the minimum duration has passed.
 *
 * @param promise The promise to be executed.
 * @param minimumDuration The minimum duration of the promise.
 * @returns The result of the executed promise.
 */
export function executePromiseWithMinimumDuration<T = unknown>(
	promise: Promise<T> | PromiseFunction<T>,
	minimumDuration: number,
) {
	const startedAt = performance.now()

	return new Promise(resolve => {
		if (typeof promise === 'function') {
			promise = promise()
		}

		// eslint-disable-next-line promise/catch-or-return
		promise.then(result => {
			const remainingDuration = minimumDuration - (performance.now() - startedAt)

			// eslint-disable-next-line promise/always-return
			if (remainingDuration) {
				setTimeout(() => resolve(result), remainingDuration)
			} else {
				resolve(result)
			}
		})
	})
}
