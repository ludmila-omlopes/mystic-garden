import CreateProfileSection from "@/components/createProfileSection";
import FeaturedArtistsSection from "@/components/featuredArtistsSection";
import HeroSection from "@/components/heroSection";
import HeroSectionMysticDrop from "@/components/heroSectionMysticDrop";
import HighlightSection from "@/components/highlightSection";
import LatestCollectionsSection from "@/components/latestCollectionsSection";
import TestimonialsSection from "@/components/testimonialsSection";
import TopCollectors from "@/components/topCollectorsSection";
import UpcomingEventsSection from "@/components/upcomingEventsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HighlightSection />
      <TopCollectors />
      <FeaturedArtistsSection />
      <CreateProfileSection />
      {/*<LatestCollectionsSection />*/}
      {/*<TestimonialsSection />*/}
      {/*<UpcomingEventsSection />*/}
    </>
  );
}
