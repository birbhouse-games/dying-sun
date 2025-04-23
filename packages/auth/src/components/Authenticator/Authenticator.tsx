// Module imports
import {
	BigMessage,
	executePromiseWithMinimumDuration,
} from '@dying-sun/shared-components'
import { useEffect } from 'react'





// Local imports
import * as API from '../../helpers/API'





// Types
type Props = {
	onError: () => unknown,
	onSuccess: () => unknown,
}





/**
 * The authentication UI.
 *
 * @type {React.FunctionComponent}
 */
export function Authenticator(props: Props) {
	const {
		onError,
		onSuccess,
	} = props

	useEffect(() => {
		executePromiseWithMinimumDuration(API.verifySession, 2000)
			.then(session => {
				if (!session) {
					return onError()
				}

				return onSuccess()
			})
			.catch(() => {
				onError()
			})
	}, [
		onError,
		onSuccess,
	])

	return (
		<BigMessage>
			{'Authenticating...'}
		</BigMessage>
	)
}
