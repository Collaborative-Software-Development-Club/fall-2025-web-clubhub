'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { ProfileVisibility, userDetails, Year, yearValues } from '@/db/schema'

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
			major: (data.get('major') as string) || '',
			year: (data.get('year') as Year) || null,
			bio: (data.get('bio') as string) || '',
			isPublic: ['true', 'on'].includes(String(data.get('isPublic'))),
		}
	} else {
		payload = {
			major: data.major || '',
			year: data.year || null,
			bio: data.bio || '',
			isPublic: typeof data.isPublic === 'boolean' ? data.isPublic : !!data.isPublic,
		}
	}
	
	await db
		.update(userDetails)
		.set({
			major: payload.major,
			year: payload.year && yearValues.includes(payload.year as any) ? payload.year : null,
			bio: payload.bio,
			profileVisibility: payload.isPublic ? 'public' as ProfileVisibility : 'private' as ProfileVisibility,
		})
		.where(eq(userDetails.userId, userId))

	return { ok: true }
}

/**
 * Read the most recent account settings for the current user.
 * Returns the payload object or null if none exists.
 */
export async function getAccountSettings() {
	const { isAuthenticated, userId } = await auth()
	if (!isAuthenticated || !userId) return null

	const rows = await db.select().from(userDetails).where(eq(userDetails.userId, userId))
	if (!rows || rows.length === 0) return null

	// take the last entry (most recently inserted)
	const last = rows[rows.length - 1]
	// Map the DB row into the shape the client form expects.
	// Return: { major: string, year: string, bio: string, isPublic: boolean }

	try {
		const yearVal = last.year != null && yearValues.includes(last.year as any) ? String(last.year) : ''

		return {
			major: typeof last.major === 'string' ? last.major : (last.major ?? ''),
			year: yearVal,
			bio: typeof last.bio === 'string' ? last.bio : (last.bio ?? ''),
			isPublic: last.profileVisibility === 'public',
		}
	} catch (e) {
		return null
	}
}