"use client";

import { useState, useTransition } from "react";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SaveAccountSetting, getAccountSettings } from "@/app/actions";
import { useRouter } from "next/navigation";
import { yearValues } from "@/db/account/schema";

export default function ProfileForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string>("");
    const [formData, setFormData] = useState({
        // username: "",
        major: "",
        year: "",
        bio: "",
        isPublic: true,
    });

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const settings: any = await getAccountSettings();
                if (!settings || !mounted) return;

                setFormData((prev) => ({
                    ...prev,
                    major: settings.major ?? prev.major,
                    year: settings.year ?? prev.year,
                    bio: settings.bio ?? prev.bio,
                    isPublic:
                        typeof settings.isPublic === "boolean"
                            ? settings.isPublic
                            : settings.profileVisibility
                            ? settings.profileVisibility === "public"
                            : prev.isPublic,
                }));
            } catch (err) {
                console.error("Failed to load account settings:", err);
                setError(err instanceof Error ? err.message : "Failed to load account settings");
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const handleChange = (name: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        try {
            startTransition(async () => {
                const result = await SaveAccountSetting(formData);
                if (result.ok) {
                    router.refresh(); // Refresh the page to show updated data
                    console.log("✅ Settings saved successfully");
                } else {
                    setError("Failed to save settings");
                }
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save settings");
            console.error("Error saving settings:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                    {error}
                </div>
            )}
            {/* Username
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    placeholder="Enter your username"
                    required
                />
            </div> */}

            {/* Major */}
            <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                <Input
                    id="major"
                    value={formData.major}
                    onChange={(e) => handleChange("major", e.target.value)}
                    placeholder="Enter your major"
                />
            </div>

            {/* Year */}
            <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select
                    value={formData.year}
                    onValueChange={(val) => handleChange("year", val)}
                >
                    <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        {yearValues.map((yr) => (
                            <SelectItem key={yr} value={yr}>
                                {yr}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Public Profile */}
            <div className="flex items-center space-x-2">
                <Switch
                    id="isPublic"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) =>
                        handleChange("isPublic", Boolean(checked))
                    }
                />
                <Label htmlFor="isPublic">Make profile public</Label>
            </div>

            {/* Submit */}
            <Button 
                type="submit" 
                className="w-full"
                disabled={isPending}
            >
                {isPending ? "Saving..." : "Save Changes"}
            </Button>
        </form>
    );
}
