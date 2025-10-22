"use client";

import { useState } from "react";
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

export default function ProfileForm() {
    const [formData, setFormData] = useState({
        username: "",
        major: "",
        year: "",
        bio: "",
        isPublic: true,
    });

    const handleChange = (name: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("✅ Form submitted:", formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    placeholder="Enter your username"
                    required
                />
            </div>

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
                        <SelectItem value="Freshman">Freshman</SelectItem>
                        <SelectItem value="Sophomore">Sophomore</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
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
            <Button type="submit" className="w-full">
                Save Changes
            </Button>
        </form>
    );
}
