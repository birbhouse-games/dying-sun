// Module imports
import { AuthError } from '@supabase/supabase-js'





// Local imports
import { ERRORS } from '../constants/ERRORS'





/**
 * Retrieves the message from an error and converts it to a message that will
 * be useful to humans when displayed in the UI.
 *
 * @param error The original error.
 * @returns The humanized error message.
 */
export function humanizeErrorMessage(error: AuthError) {
	return ERRORS[error.code ?? error.message]
}
