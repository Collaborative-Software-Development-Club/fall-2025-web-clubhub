"use client";

import { useState, useEffect } from "react";
// Import animation components from the Framer Motion library.
import { motion, AnimatePresence } from "framer-motion";
// Import UI components from shadcn.
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Import the club data from a local JSON file.
import clubInfo from "@/mock/clubs.json";

// Create an animatable version of the Card component using Framer Motion.
// This allows us to animate its properties directly (like backgroundColor).
const MotionCard = motion(Card);

// Define the expected props for the SwipeButtons component using a TypeScript interface.
interface SwipeButtonsProps {
    onJoin: () => void;
    onSkip: () => void;
    onBack: () => void;
    isFirstCard: boolean;
    isLastCard: boolean;
}

export function SwipeButtons({
    onJoin,
    onSkip,
    onBack,
    isFirstCard,
    isLastCard,
}: SwipeButtonsProps) {
    return (
        <div className="flex justify-center items-center pt-6 gap-4">
            {/* The "Back" button is disabled if it's the first card. */}
            <Button onClick={onBack} variant="outline" disabled={isFirstCard}>
                Back
            </Button>
            {/* The "Skip" and "Join" buttons are disabled if it's the last card. */}
            <Button
                onClick={onSkip}
                variant="destructive"
                disabled={isLastCard}
            >
                Skip
            </Button>
            <Button onClick={onJoin} disabled={isLastCard}>
                Join
            </Button>
        </div>
    );
}

// Defines the animation "variants" or states for the card.
const cardVariants = {
    // State for a card entering the screen. Slides in from left or right.
    enter: (custom: { direction: number }) => ({
        x: custom.direction > 0 ? 1000 : -1000,
        opacity: 0,
        rotate: custom.direction > 0 ? 45 : -45,
    }),
    // State for a card in the center of the screen.
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        rotate: 0,
        backgroundColor: "#ffffff", // Ensures the card is white when centered.
        transition: { duration: 0.3 },
    },
    // State for a card exiting the screen. Changes color based on the user's action.
    exit: (custom: {
        direction: number;
        action: "join" | "skip" | "back";
    }) => ({
        zIndex: 0,
        x: custom.direction < 0 ? 1000 : -1000,
        opacity: 0,
        rotate: custom.direction < 0 ? 45 : -45,
        backgroundColor:
            custom.action === "join"
                ? "#22c55e" // Green for "Join"
                : custom.action === "skip"
                  ? "#ef4444" // Red for "Skip"
                  : "#ffffff", // No color change for "Back"
        transition: { duration: 0.5 },
    }),
};

// Object that stores club statuses.
type ClubStatuses = {
    [key: string]: "joined" | "skipped";
};

// The main component for the page.
export function ForYouPageComponent() {
    // Tracks the index of the club currently being displayed.
    const [currentIndex, setCurrentIndex] = useState(0);
    // Stores the user's choices ('joined' or 'skipped').
    // It loads the initial state from the browser's localStorage.
    const [clubStatuses, setClubStatuses] = useState<ClubStatuses>(() => {
        try {
            const savedStatuses = window.localStorage.getItem("clubStatuses");
            return savedStatuses ? JSON.parse(savedStatuses) : {};
        } catch (error) {
            console.error("Failed to load statuses from localStorage", error);
            return {};
        }
    });

    // State to control the animation's horizontal direction (1 for right, -1 for left).
    const [direction, setDirection] = useState(0);
    // Remembers the last forward swipe direction for the "Back" button's animation.
    const [lastDirection, setLastDirection] = useState(1);
    // Tracks the specific action to control the card's exit color.
    const [action, setAction] = useState<"join" | "skip" | "back">("skip");

    // This hook saves the club statuses to localStorage whenever they change.
    useEffect(() => {
        try {
            window.localStorage.setItem(
                "clubStatuses",
                JSON.stringify(clubStatuses),
            );
        } catch (error) {
            console.error("Failed to save statuses to localStorage", error);
        }
    }, [clubStatuses]);

    // Gets the data object for the currently visible club.
    const currentClub = clubInfo[currentIndex];

    // Moves to the next club, stopping at the end of the list.
    const showNextClub = () => {
        const nextIndex = Math.min(currentIndex + 1, clubInfo.length);
        setCurrentIndex(nextIndex);
    };

    // Moves to the previous club, stopping at the beginning of the list.
    const showPreviousClub = () => {
        const prevIndex = Math.max(currentIndex - 1, 0);
        setCurrentIndex(prevIndex);
    };

    // Handles the "Join" button click.
    const handleJoin = () => {
        if (currentIndex >= clubInfo.length) return; // Don't do anything if we're past the last card.
        const currentClubName = clubInfo[currentIndex]["Club Name"];
        setClubStatuses((prevStatuses) => ({
            ...prevStatuses,
            [currentClubName]: "joined",
        }));
        setDirection(-1); // Animate left.
        setLastDirection(-1); // Remember this direction.
        setAction("join"); // Set action for color change.
        showNextClub();
    };

    // Handles the "Skip" button click.
    const handleSkip = () => {
        if (currentIndex >= clubInfo.length) return;
        const currentClubName = clubInfo[currentIndex]["Club Name"];
        setClubStatuses((prevStatuses) => ({
            ...prevStatuses,
            [currentClubName]: "skipped",
        }));
        setDirection(1); // Animate right.
        setLastDirection(1); // Remember this direction.
        setAction("skip"); // Set action for color change.
        showNextClub();
    };

    // Handles the "Back" button click.
    const handleBack = () => {
        setDirection(-lastDirection); // Animate in the opposite direction of the last forward swipe.
        setAction("back");
        showPreviousClub();
    };

    // Boolean flags to control the UI state (e.g., disabling buttons).
    const isFirstCard = currentIndex === 0;
    const isLastCard = currentIndex >= clubInfo.length;
    const hasFinished = currentIndex >= clubInfo.length;
    // Get the stored status for the current card to display the "Joined"/"Skipped" badge.
    const status = !hasFinished
        ? clubStatuses[currentClub["Club Name"]]
        : undefined;

    return (
        <>
            {/* Pass the handlers and boolean flags to the buttons component. */}
            <SwipeButtons
                onJoin={handleJoin}
                onSkip={handleSkip}
                onBack={handleBack}
                isFirstCard={isFirstCard}
                isLastCard={isLastCard}
            />
            {/* Main container for the card swiper. */}
            <div
                className="flex justify-center items-start h-screen py-8"
                style={{ position: "relative", overflow: "hidden" }}
            >
                {/* If the user has swiped through all clubs, show a final message. */}
                {hasFinished ? (
                    <Card className="flex justify-center items-center w-full max-w-[720px] h-[480px] bg-white rounded-xl shadow-2xl border border-gray-100">
                        <CardTitle>No More Clubs!</CardTitle>
                    </Card>
                ) : (
                    // This component enables the exit animation when a card is removed.
                    <AnimatePresence
                        initial={false}
                        custom={{ direction, action }}
                    >
                        {/* The animatable card component. */}
                        <MotionCard
                            // The key is critical for Framer Motion to track which item is entering/exiting.
                            key={currentIndex}
                            // Passes the direction and action to the animation variants.
                            custom={{ direction, action }}
                            // Connects the component to our predefined animation states.
                            variants={cardVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            // Defines the physics and duration of the animations.
                            transition={{
                                x: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                },
                                opacity: { duration: 0.2 },
                            }}
                            // Absolute positioning is needed to stack cards during the animation.
                            style={{ position: "absolute" }}
                            className="relative flex flex-col w-full max-w-[720px] h-[480px] rounded-xl shadow-2xl border border-gray-100"
                        >
                            {/* Display a "Joined" or "Skipped" badge if the user has seen this card before. */}
                            {status && (
                                <div
                                    className={`absolute top-4 right-4 px-3 py-1 text-sm font-bold text-white rounded-full ${status === "joined" ? "bg-green-500" : "bg-yellow-500"}`}
                                >
                                    {status === "joined" ? "Joined" : "Skipped"}
                                </div>
                            )}
                            {/* The rest of the card content displays the current club's information. */}
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-bold">
                                    {currentClub["Club Name"]}
                                </CardTitle>
                                <CardDescription>
                                    {currentClub.Categories["Primary Type"]}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow p-4 text-left overflow-y-auto">
                                <p className="mb-4 italic">
                                    {currentClub["Purpose Statement"]}
                                </p>
                                <div className="mb-3">
                                    <h3 className="font-semibold">
                                        Meeting Info:
                                    </h3>
                                    <p className="text-sm text-gray-700">
                                        {
                                            currentClub["Meeting Information"][
                                                "Meeting Time and Place"
                                            ]
                                        }
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">
                                        Membership:
                                    </h3>
                                    <p className="text-sm text-gray-700">
                                        Type:{" "}
                                        {
                                            currentClub["Membership Details"][
                                                "Membership Type"
                                            ]
                                        }
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-center items-center gap-4 p-4 border-t">
                                {currentClub["Contact Information"].Website && (
                                    <Button asChild variant="link">
                                        <a
                                            href={
                                                currentClub[
                                                    "Contact Information"
                                                ].Website
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Website
                                        </a>
                                    </Button>
                                )}
                                {currentClub["Contact Information"]
                                    .Instagram && (
                                    <Button asChild variant="link">
                                        <a
                                            href={
                                                currentClub[
                                                    "Contact Information"
                                                ].Instagram
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Instagram
                                        </a>
                                    </Button>
                                )}
                            </CardFooter>
                        </MotionCard>
                    </AnimatePresence>
                )}
            </div>
        </>
    );
}
