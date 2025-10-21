'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const INTERESTS = [
    'Technology',
    'Sports',
    'Music',
    'Art',
    'Science',
    'Food',
    'Travel',
    'Gaming',
    'Photography',
    'Fitness',
    'Literature',
    'Movies',
    'Politics',
    'Fashion',
    'Education',
    'Volunteer',
    'Entrepreneurship',
    'Design',
    'Animals',
    'Nature',
]

export default function InterestsPage() {
    const router = useRouter()
    const [selected, setSelected] = useState<string[]>([])
    const REQUIRED = 3

    useEffect(() => {
        // restore previous selections (optional)
        try {
            const raw = localStorage.getItem('selectedInterests')
            if (raw) setSelected(JSON.parse(raw))
        } catch {
            // ignore
        }
    }, [])

    useEffect(() => {
        // persist selections so other pages can read them
        try {
            localStorage.setItem('selectedInterests', JSON.stringify(selected))
        } catch {
            // ignore
        }
    }, [selected])

    function toggleInterest(interest: string) {
        setSelected((prev) =>
            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
        )
    }

    function handleContinue() {
        if (selected.length >= REQUIRED) {
            // navigate to the tinder-swipe page route
            // the app route located at app/tinder-swipe/page.tsx is available at "/tinder-swipe"
            router.push('/tinder-swipe')
        }
    }

    return (
        <main style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Choose your interests</h1>
                <p style={styles.subtitle}>
                    Pick at least {REQUIRED} interests so we can show clubs you might like.
                </p>

                <div style={styles.grid}>
                    {INTERESTS.map((interest) => {
                        const active = selected.includes(interest)
                        return (
                            <button
                                key={interest}
                                onClick={() => toggleInterest(interest)}
                                aria-pressed={active}
                                style={{
                                    ...styles.chip,
                                    ...(active ? styles.chipActive : {}),
                                }}
                            >
                                {interest}
                            </button>
                        )
                    })}
                </div>

                <div style={styles.footer}>
                    <div>
                        <span style={styles.count}>{selected.length}</span>
                        <span> / {REQUIRED} selected</span>
                        {selected.length < REQUIRED && (
                            <div style={styles.hint}>Select {REQUIRED - selected.length} more</div>
                        )}
                    </div>

                    <button
                        onClick={handleContinue}
                        disabled={selected.length < REQUIRED}
                        style={{
                            ...styles.continue,
                            ...(selected.length < REQUIRED ? styles.continueDisabled : {}),
                        }}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </main>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f3f4f6',
        padding: 24,
    },
    card: {
        width: '100%',
        maxWidth: 920,
        background: '#fff',
        borderRadius: 12,
        padding: 28,
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
    },
    title: {
        margin: 0,
        fontSize: 24,
        fontWeight: 700,
        color: '#111827',
    },
    subtitle: {
        marginTop: 6,
        marginBottom: 18,
        color: '#6b7280',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    chip: {
        padding: '8px 12px',
        borderRadius: 999,
        border: '1px solid #e5e7eb',
        background: '#fff',
        cursor: 'pointer',
        color: '#111827',
        fontSize: 14,
    },
    chipActive: {
        background: '#2563eb',
        color: '#fff',
        borderColor: '#2563eb',
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    count: {
        fontWeight: 700,
        marginRight: 6,
    },
    hint: {
        color: '#ef4444',
        fontSize: 13,
        marginTop: 6,
    },
    continue: {
        padding: '10px 18px',
        background: '#10b981',
        color: '#fff',
        borderRadius: 8,
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
    },
    continueDisabled: {
        background: '#9ca3af',
        cursor: 'not-allowed',
    },
}