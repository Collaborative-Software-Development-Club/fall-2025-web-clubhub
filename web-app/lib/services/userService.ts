/**
 * Fetches user data by user ID
 * @param userId - The ID of the user to fetch
 * @returns Promise containing user data object
 * @example
 * const user = await getUserData('123');
 * console.log(user.name);
 */
export async function getUserData(userId: string) {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
}

/**
 * Fetches the current authenticated user's data
 * @returns Promise containing current user data object
 * @example
 * const currentUser = await getCurrentUser();
 * console.log(currentUser.email);
 */
export async function getCurrentUser() {
    const response = await fetch('/api/users/me');
    return response.json();
}