'use server'

import { checkRole } from '@/utils/roles'
import { clerkClient } from '@clerk/nextjs/server'

export async function setRole(formData: FormData): Promise<void> {
  const client = await clerkClient()

  // Check that the user trying to set the role is an admin
  if (!checkRole('admin')) {
    return
  }

  try {
    const res = await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: { role: formData.get('role') },
    })
    return
  } catch (err) {
    return
  }
}

export async function removeRole(formData: FormData): Promise<void> {
  const client = await clerkClient()

  try {
    const res = await client.users.updateUserMetadata(formData.get('id') as string, {
      publicMetadata: { role: null },
    })
    return
  } catch (err) {
    return
  }
}