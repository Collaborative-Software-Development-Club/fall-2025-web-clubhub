import { useEffect, useState } from 'react';

/**
 * Custom hook to fetch and manage user data
 * @param userId - Optional user ID to fetch. If not provided, fetches current user
 * @returns Object containing user data and loading state
 * @example
 * const { user, loading } = useUser();
 * if (loading) return <div>Loading...</div>;
 * return <div>{user.name}</div>;
 * 
 * @example
 * const { user, loading } = useUser('123');
 * return <div>{user?.email}</div>;
 */
export function useUser(userId?: string) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const endpoint = userId ? `/api/users/${userId}` : '/api/users/me';
        fetch(endpoint)
            .then(res => res.json())
            .then(data => setUser(data))
            .finally(() => setLoading(false));
    }, [userId]);

    return { user, loading };
}