import { tagsService } from "@/services/discovery/tags-service";
import { HomePage } from "./home-page";
import { scrapedClubsService } from "@/services/discovery/scraped-clubs";
import { Suspense } from "react";

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
    const searchedClubs =
        query != null || selectedTags.length > 0
            ? await scrapedClubsService.searchClubs(query, selectedTags)
            : null;
    console.log(searchedClubs);
    return (
        <Suspense key={query} fallback={"Loading..."}>
            <HomePage
                tags={tags}
                featuredClubs={featuredClubs}
                searchedClubs={searchedClubs}
            />
            ;
        </Suspense>
    );
}
