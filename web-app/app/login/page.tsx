import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clubsData from "@/mock/clubs.json";

// Utility to shuffle and pick N random clubs
function getRandomClubs(clubs, count = 3) {
    const shuffled = [...clubs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

const styles = {
    page: {
        minHeight: "100vh",
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        borderRadius: "1rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        marginBottom: "3rem",
        minWidth: 320,
    },
    cardHeader: {
        alignItems: "center",
        width: "100%",
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "center",
        padding: 0,
    },
    cardTitle: {
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "0.5rem",
        textAlign: "center" as const,
        width: "100%",
    },
    cardContent: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        width: "100%",
    },
    heading: {
        fontSize: "1.125rem",
        fontWeight: 600,
        marginBottom: "1rem",
    },
    buttonRow: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
        marginBottom: "1rem",
        width: "100%",
    },
    button: {
        width: "100%",
    },
    debugText: {
        fontSize: "0.75rem",
        color: "#6b7280",
    },
    browseContainer: {
        width: "100%",
        maxWidth: "48rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
    },
    browseTitle: {
        fontSize: "1.125rem",
        fontWeight: 600,
        marginBottom: "1rem",
    },
    clubList: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "1.5rem",
    },
    tagRow: {
        display: "flex",
        flexWrap: "wrap" as const,
        gap: "0.5rem",
    },
    tag: {
        background: "#e5e7eb",
        color: "#374151",
        padding: "0.25rem 0.5rem",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
    },
};

export default function LoginPage() {
    const randomClubs = getRandomClubs(clubsData, 3);

    return (
        <div style={styles.page}>
            {/* Floating panel */}
            <Card style={styles.card}>
                <CardHeader style={styles.cardHeader}>
                    <CardTitle style={styles.cardTitle}>Welcome</CardTitle>
                </CardHeader>
                <CardContent style={styles.cardContent}>
                    <h3 style={styles.heading}>To access User Profile you must log in.</h3>
                    <div style={styles.buttonRow}>
                        {/* Login Button */}
                        <Button style={styles.button} variant="default">
                            Login
                        </Button>
                        {/* Register Button */}
                        <Button style={styles.button} variant="success">
                            Register
                        </Button>
                        {/* Debug Mode Button */}
                        <Link href="/userprofile" style={{ width: "100%" }}>
                            <Button style={styles.button} variant="secondary">
                                Debug Mode
                            </Button>
                        </Link>
                    </div>
                    <p style={styles.debugText}>
                        Debug Mode lets you view the profile page without logging in.
                    </p>
                </CardContent>
            </Card>
            {/* Browse page below */}
            <div style={styles.browseContainer}>
                <h3 style={styles.browseTitle}>Browse Clubs</h3>
                <div style={styles.clubList}>
                    {randomClubs.map((club) => (
                        <Card key={club["Club Name"]}>
                            <CardHeader>
                                <CardTitle>{club["Club Name"]}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div style={styles.tagRow}>
                                    {(Array.isArray(club.Categories["Secondary Types"])
                                        ? club.Categories["Secondary Types"]
                                        : [club.Categories["Secondary Types"]]
                                    ).map((interest: string) => (
                                        <span key={interest} style={styles.tag}>
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}