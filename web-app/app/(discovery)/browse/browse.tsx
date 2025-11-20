"use client";
import { useCallback, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { ClubCard } from "@/app/(discovery)/club-card"
import { Toggle } from "@/components/ui/toggle";
import FilterDropdown from "@/components/browse/FilterDropdown";
import { Button } from "@/components/ui/button";

function useUniqueOptions(clubsData: any[], key: string) {
    return useMemo(() => {
        return Array.from(
            new Set(clubsData.map((c) => c?.[key]).filter(Boolean)),
        ) as string[];
    }, [clubsData, key]);
}

export function Browse({
    clubsData,
    interestOptions,
}: {
    clubsData: {
        id: number;
        name: string;
        description: string;
        interests: string[];
        leader: string;
        contact: string | undefined;
        // added fields from ClubOverview for filtering
        campus?: string;
        status?: string;
        meetingTimeAndPlace?: string;
        membershipType?: string;
        timeOfYearForNewMembership?: string;
        chargeDues?: string;
    }[];
    interestOptions: string[];
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<{
        campus: string[];
        status: string[];
        meetingTimeAndPlace: string[];
        membershipType: string[];
        timeOfYearForNewMembership: string[];
        chargeDues: string[];
    }>({
        campus: [],
        status: [],
        meetingTimeAndPlace: [],
        membershipType: [],
        timeOfYearForNewMembership: [],
        chargeDues: [],
    });

    // Build unique option lists for each filter from clubsData (factored into a hook)
    const campusOptions = useUniqueOptions(clubsData, "campus");
    const statusOptions = useUniqueOptions(clubsData, "status");
    const meetingOptions = useUniqueOptions(clubsData, "meetingTimeAndPlace");
    const membershipTypeOptions = useUniqueOptions(clubsData, "membershipType");
    const timeOfYearOptions = useUniqueOptions(clubsData, "timeOfYearForNewMembership");
    const chargeDuesOptions = useUniqueOptions(clubsData, "chargeDues");

    const toggleFilter = useCallback(
        (key: keyof typeof selectedFilters, value: string) => {
            setSelectedFilters((prev) => {
                const prevArr = prev[key];
                const next = prevArr.includes(value)
                    ? prevArr.filter((v) => v !== value)
                    : [...prevArr, value];
                return { ...prev, [key]: next };
            });
        },
        [],
    );

    const toggleInterest = useCallback((interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest],
        );
    }, []);

    const filteredClubs = useMemo(() => {
        return clubsData.filter((club) => {
            const matchesSearch = club.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesInterests =
                selectedInterests.length === 0 ||
                selectedInterests.some((i) => club.interests.includes(i));

            const check = (key: keyof typeof selectedFilters) => {
                const selected = selectedFilters[key];
                if (!selected || selected.length === 0) return true;
                const raw = (club as any)[key];
                if (raw == null) return false;
                return Array.isArray(raw)
                    ? raw.some((r) => selected.includes(String(r)))
                    : selected.includes(String(raw));
            };

            return (
                matchesSearch &&
                matchesInterests &&
                check("campus") &&
                check("status") &&
                check("meetingTimeAndPlace") &&
                check("membershipType") &&
                check("timeOfYearForNewMembership") &&
                check("chargeDues")
            );
        });
    }, [clubsData, searchTerm, selectedInterests, selectedFilters]);

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">
                Browse Student Organizations
            </h1>

            {/* Search Input */}
            <Input
                type="text"
                placeholder="Search clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 w-full">
                <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                        <Toggle
                            value={interest}
                            onClick={() => toggleInterest(interest)}
                            key={interest}
                            aria-label={interest}
                            variant="outline"
                        >
                            {interest}
                        </Toggle>
                    ))}
                </div>

                {/* Dropdown filter list */}
                <div className="flex flex-wrap gap-2 ml-0 sm:ml-auto mt-2">
                    {[
                        { key: "campus", label: "Campus", options: campusOptions },
                        { key: "status", label: "Status", options: statusOptions },
                        { key: "meetingTimeAndPlace", label: "Meetings", options: meetingOptions },
                        { key: "membershipType", label: "Membership", options: membershipTypeOptions },
                        { key: "timeOfYearForNewMembership", label: "New Members", options: timeOfYearOptions },
                        { key: "chargeDues", label: "Dues", options: chargeDuesOptions },
                    ].map((f) => (
                        <FilterDropdown
                            key={f.key}
                            label={f.label}
                            options={f.options}
                            selected={selectedFilters[f.key as keyof typeof selectedFilters]}
                            onToggle={(v) => toggleFilter(f.key as keyof typeof selectedFilters, v)}
                        />
                    ))}
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-2 text-sm"
                        onClick={() => {
                            // clear both the checkbox filters and interest toggles
                            setSelectedFilters({
                                campus: [],
                                status: [],
                                meetingTimeAndPlace: [],
                                membershipType: [],
                                timeOfYearForNewMembership: [],
                                chargeDues: [],
                            });
                            setSelectedInterests([]);
                        }}
                    >
                        Clear all filters
                    </Button>
                </div>
            </div>

            {/* Club List */}
            <div className="w-full space-y-4">
                {filteredClubs.length === 0 ? (
                    <p className="text-gray-500 text-center">
                        No clubs match your search and filters.
                    </p>
                ) : (
                    filteredClubs.map((club) => (
                        <ClubCard
                            key={club.id}
                            club={club}
                        />
                    ))
                )}
            </div>
        </main>
    );
}
