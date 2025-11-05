'use server'

import { auth } from '@clerk/nextjs/server'
import { UserMessages } from './db/schema'
import { db } from './db'
import { eq } from 'drizzle-orm'

/** Example functions and import showing how to interact with the database */

// export async function createUserMessage(formData: FormData) {
//   const { isAuthenticated, userId } = await auth()
//   if (!isAuthenticated) throw new Error('User not found')

//   const message = formData.get('message') as string
//   await db.insert(UserMessages).values({
//     user_id: userId,
//     message,
//   })
// }

// export async function deleteUserMessage() {
//   const { isAuthenticated, userId } = await auth()
//   if (!isAuthenticated) throw new Error('User not found')

//   await db.delete(UserMessages).where(eq(UserMessages.user_id, userId))
// }

// (server actions implemented below)

/**
 * Save account settings for the current user.
 * Accepts either a FormData (from a form action) or a plain object with the
 * shape { username, major, year, bio, isPublic }.
 *
 * Implementation detail: this app currently registers only the `UserMessages`
 * table in the app-level drizzle schema. To avoid changing DB schema here we
 * store account settings as a JSON message in that table under a small
 * envelope: { type: 'account-settings', payload: {...} }.
 */
export async function SaveAccountSetting(data: FormData | Record<string, any>) {
	const { isAuthenticated, userId } = await auth()
	if (!isAuthenticated || !userId) throw new Error('User not found')

	let payload: Record<string, any>

	if (data instanceof FormData) {
		payload = {
			username: (data.get('username') as string) || '',
			major: (data.get('major') as string) || '',
			year: (data.get('year') as string) || '',
			bio: (data.get('bio') as string) || '',
			// Form controls like Switch may send 'on' or 'true' depending on implementation
			isPublic: ['true', 'on'].includes(String(data.get('isPublic'))),
		}
	} else {
		payload = {
			username: data.username || '',
			major: data.major || '',
			year: data.year || '',
			bio: data.bio || '',
			isPublic: typeof data.isPublic === 'boolean' ? data.isPublic : !!data.isPublic,
		}
	}

	const message = JSON.stringify({ type: 'account-settings', payload })

	await db.insert(UserMessages).values({
		user_id: userId,
		message,
	})

	return { ok: true }
}

/**
 * Read the most recent account settings for the current user.
 * Returns the payload object or null if none exists.
 */
export async function getAccountSettings() {
	const { isAuthenticated, userId } = await auth()
	if (!isAuthenticated || !userId) return null

	const rows = await db.select().from(UserMessages).where(eq(UserMessages.user_id, userId))
	if (!rows || rows.length === 0) return null

	// take the last entry (most recently inserted)
	const last = rows[rows.length - 1]
	try {
		const parsed = JSON.parse(last.message as string)
		if (parsed && parsed.type === 'account-settings') return parsed.payload
	} catch (e) {
		// ignored: message might not be JSON
	}

	return null
}