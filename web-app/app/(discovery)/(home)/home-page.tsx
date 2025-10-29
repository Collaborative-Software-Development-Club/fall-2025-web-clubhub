import { Tag } from "@/services/discovery/tags-service/Tag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InterestBar } from "../interest-bar";
import { FeaturedClubs } from "./featured-clubs";

export function HomePage({ tags }: { tags: string[] }) {
    return (
        <div className="flex flex-col">
            <section className="relative flex items-center justify-center  text-center mt-4">
                <div className="relative z-10 flex w-full flex-col items-center space-y-4 px-4">
                    <SearchBar />
                    <InterestBar allTags={tags} />
                </div>
            </section>

            <FeaturedClubs />
        </div>
    );
}

const SearchBar = () => (
    <div className="w-full max-w-lg items-center space-x-2 relative z-0">
        <Input
            type="text"
            placeholder="Search clubs or keywords"
            className="shadow-primary/50 shadow-2xl flex-1 px-8 py-6 w-full rounded-full"
        ></Input>
        <Button type="submit" className="rounded-full absolute right-2 top-2">
            Search
        </Button>
    </div>
);
