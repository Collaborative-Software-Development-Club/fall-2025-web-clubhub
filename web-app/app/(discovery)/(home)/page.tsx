import { tagsService } from "@/services/discovery/tags-service";
import { Tag } from "@/services/discovery/tags-service/Tag";
import {
    FeaturedClubs,
    scrapedClubsService,
} from "@/services/discovery/scraped-clubs";
import { SearchAndFilter } from "./search-and-filter";
import { BrowsePage } from "./browse-page";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Home(props: {
    searchParams?: Promise<{
        query?: string;
        tags?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? null;
    const selectedTags = searchParams?.tags?.split(",") ?? [];
    console.log("selected tags", selectedTags);
    const tags = await tagsService.getAllTags();
    const featuredClubs = await scrapedClubsService.getFeaturedClubs();
    console.log(query, selectedTags);
    return (
        <div className="flex flex-col">
            <SearchAndFilter tags={tags} />
            <Suspense
                key={query}
                fallback={
                    <div className="flex flex-col gap-4 p-40">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <Skeleton key={item} className="h-40 w-full" />
                        ))}
                    </div>
                }
            >
                <InnerPage
                    tags={tags}
                    featuredClubs={featuredClubs}
                    query={query}
                    selectedTags={selectedTags}
                />
            </Suspense>
        </div>
    );
}

async function InnerPage({
    tags,
    featuredClubs,
    query,
    selectedTags,
}: {
    tags: Tag[];
    featuredClubs: FeaturedClubs;
    query: string | null;
    selectedTags: string[];
}) {
    const searchedClubs =
        query != null || selectedTags.length > 0
            ? await scrapedClubsService.searchClubs(query, selectedTags)
            : null;
    console.log(searchedClubs);
    return (
        <BrowsePage
            featuredClubs={featuredClubs}
            searchedClubs={searchedClubs}
        />
    );
}
