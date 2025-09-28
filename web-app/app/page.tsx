"use client"; 

import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clubInfo from "@/mock/clubs.json";

interface SwipeButtonsProps {
  onJoin: () => void;
  onSkip: () => void;
  onBack: () => void;
}


export function SwipeButtons({ onJoin, onSkip, onBack }: SwipeButtonsProps) {
    return (
        <div className="flex justify-center items-center p-5 gap-4">
            <Button onClick={onBack} variant="outline">Back</Button>
            <Button onClick={onSkip} variant="destructive">Skip</Button>
            <Button onClick={onJoin}>Join</Button>
        </div>
    );
}

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    // State to store the status of each club ('joined' or 'skipped')
    const [clubStatuses, setClubStatuses] = useState<{ [key: string]: 'joined' | 'skipped' }>({});

    const currentClub = clubInfo[currentIndex];

    // Function to advance to the next club
    const showNextClub = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clubInfo.length);
    };

    // Function to go to the previous club
    const showPreviousClub = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? clubInfo.length - 1 : prevIndex - 1));
    };
    
    // Handler to record a 'join' action and then advance
    const handleJoin = () => {
        const currentClubName = clubInfo[currentIndex]["Club Name"];
        setClubStatuses(prevStatuses => ({
            ...prevStatuses,
            [currentClubName]: 'joined'
        }));
        showNextClub();
    };

    // Handler to record a 'skip' action and then advance
    const handleSkip = () => {
        const currentClubName = clubInfo[currentIndex]["Club Name"];
        setClubStatuses(prevStatuses => ({
            ...prevStatuses,
            [currentClubName]: 'skipped'
        }));
        showNextClub();
    };

    if (!currentClub) {
        return <div className="text-center p-10">No clubs found.</div>;
    }

    // Get the status of the currently displayed club
    const status = clubStatuses[currentClub["Club Name"]];

    return (
        <>
            {/* Pass the new handlers to the SwipeButtons component */}
            <SwipeButtons onJoin={handleJoin} onSkip={handleSkip} onBack={showPreviousClub} />
            <div className="flex justify-center h-screen pb-10">
                <Card className="relative flex flex-col w-full max-w-[720px] h-[480px] bg-white rounded-xl shadow-2xl border border-gray-100">
                    
                    {/* Optional: A badge to show the club's status */}
                    {status && (
                        <div className={`absolute top-4 right-4 px-3 py-1 text-sm font-bold text-white rounded-full ${status === 'joined' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                            {status === 'joined' ? 'Joined' : 'Skipped'}
                        </div>
                    )}

                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">{currentClub["Club Name"]}</CardTitle>
                        <CardDescription>{currentClub.Categories["Primary Type"]}</CardDescription>
                    </CardHeader>
                    {/* ... rest of your card content ... */}
                    <CardContent className="flex-grow p-4 text-left overflow-y-auto">
                        <p className="mb-4 italic">{currentClub["Purpose Statement"]}</p>
                        
                        <div className="mb-3">
                            <h3 className="font-semibold">Meeting Info:</h3>
                            <p className="text-sm text-gray-700">{currentClub["Meeting Information"]["Meeting Time and Place"]}</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold">Membership:</h3>
                            <p className="text-sm text-gray-700">Type: {currentClub["Membership Details"]["Membership Type"]}</p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-center items-center gap-4 p-4 border-t">
                        {currentClub["Contact Information"].Website && 
                            <Button asChild variant="link">
                                <a href={currentClub["Contact Information"].Website} target="_blank" rel="noopener noreferrer">Website</a>
                            </Button>
                        }
                        {currentClub["Contact Information"].Instagram && 
                            <Button asChild variant="link">
                                <a href={currentClub["Contact Information"].Instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                            </Button>
                        }
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}