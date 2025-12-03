import { ClubCarousel } from "../club-carousel";
import { ClubCarouselHeader } from "../club-carousel-header";
import { CarouselItem } from "@/components/ui/carousel";
import { ClubCard } from "../club-card";
import { FeaturedClubs as FeaturedClubsType } from "@/services/discovery/scraped-clubs";

export function FeaturedClubs({
    featuredClubs,
}: {
    featuredClubs: FeaturedClubsType;
}) {
    // Get data for the "Featured" carousel
    const sections = [
        // {
        //     name: "Featured Clubs",
        //     clubs: featuredClubs,
        // },
        ...featuredClubs,
    ];

    return (
        <>
            {sections.map((section) =>
                section.clubs.length > 0 ? (
                    <section
                        className="container mx-auto py-8 flex flex-col gap-4"
                        key={section.name}
                    >
                        <ClubCarouselHeader name={section.name} />
                        <ClubCarousel>
                            {section.clubs.map((club, index) => (
                                <CarouselItem
                                    key={`featured-${index}`}
                                    className="pl-2 md:pl-4 basis-1/1 md:basis-1/2 lg:basis-1/3 h-full"
                                >
                                    <ClubCard club={club} />
                                </CarouselItem>
                            ))}
                        </ClubCarousel>
                    </section>
                ) : null,
            )}
        </>
    );
}
