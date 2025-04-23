'use client'

// Module imports
import {
	createClient,
	type Provider,
	type SupabaseClient,
} from '@supabase/supabase-js'





// Constants
const defaultOAuthOptions = {
	redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
}





// Variables
let supabaseClient: SupabaseClient





/**
 * Creates or retrieves the Supabase client.
 *
 * @returns The Supabase client.
 */
export function getSupabaseClient(): SupabaseClient {
	if (!supabaseClient) {
		supabaseClient = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		)
	}

	return supabaseClient
}

/**
 * Registers a new user.
 *
 * @param email The user's email.
 * @param password The user's password.
 */
export async function registerNewAccount(email: string, password: string) {
	const supabase = getSupabaseClient()

	const { error } = await supabase.auth.signUp({
		email,
		password,
	})

	if (error) {
		throw error
	}
}

/**
 * Requests a password reset.
 *
 * @param email The user's email.
 */
export async function requestPasswordReset(email: string) {
	const supabase = getSupabaseClient()

	const { error } = await supabase.auth.resetPasswordForEmail(email)

	if (error) {
		throw error
	}
}

/**
 * Initiates login via Supabase.
 *
 * @param provider The ID of the provider to be used.
 */
export async function signInWithOAuth(provider: Provider) {
	const supabase = getSupabaseClient()

	await supabase.auth.signInWithOAuth({
		provider,
		options: defaultOAuthOptions,
	})
}

/** Initiates Apple login via Supabase. */
export async function signInWithApple() {
	await signInWithOAuth('apple')
}

/** Initiates Discord login via Supabase. */
export async function signInWithDiscord() {
	await signInWithOAuth('discord')
}

/** Initiates Google login via Supabase. */
export async function signInWithGoogle() {
	await signInWithOAuth('google')
}

/**
 * Logs the user in to Supabase using their email and password.
 *
 * @param email The user's email.
 * @param password The user's password.
 * @returns The JWT if available.
 */
export async function signInWithEmail(email: string, password: string) {
	const supabase = getSupabaseClient()

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		throw error
	}

	const session = await supabase.auth.getSession()

	return session.data.session?.access_token
}

/** Signs the user out. */
export async function signOut() {
	const supabase = getSupabaseClient()

	await supabase.auth.signOut()
}

/**
 * Verifies that a valid session is available.
 *
 * @returns The session if it exists.
 */
export async function verifySession() {
	const supabase = getSupabaseClient()

	if (location.hash) {
		const sessionData = location.hash
			.substring(1)
			.split('&')
			.reduce((accumulator, item) => {
				const [key, value] = item.split('=')

				accumulator[key] = value

				return accumulator
			}, {} as Record<string, string>)

		if (('access_token' in sessionData) && ('refresh_token' in sessionData)) {
			await supabase.auth.setSession({
				// eslint-disable-next-line camelcase
				access_token: sessionData.access_token,
				// eslint-disable-next-line camelcase
				refresh_token: sessionData.refresh_token,
			})
		}
	}

	const {
		data,
		error,
	} = await supabase.auth.getSession()

	if (error) {
		throw error
	}

	return data.session
}
