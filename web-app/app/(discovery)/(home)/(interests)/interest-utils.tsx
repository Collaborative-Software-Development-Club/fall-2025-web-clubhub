import { GraduationCap, Tag as TagIcon } from "lucide-react";
import { Tag } from "@/services/discovery/tags-service/Tag";

type Category = Tag["type"];

export const CategoryIcon = ({ categoryName }: { categoryName: Category }) => {
    switch (categoryName) {
        case "MAJOR":
            return <GraduationCap className="h-4 w-4" />;
        case "DIRECTORY":
            return <TagIcon className="h-4 w-4" />;
        default:
            return <TagIcon className="h-4 w-4" />;
    }
};

export const getCategoryDisplayName = (categoryName: Category) => {
    switch (categoryName) {
        case "MAJOR":
            return "Majors";
        case "DIRECTORY":
            return "Types of Clubs";
        default:
            return categoryName;
    }
};
