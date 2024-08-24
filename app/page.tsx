'use client';

import CreateProfileSection from "@/components/createProfileSection";
import FeaturedArtistsSection from "@/components/featuredArtistsSection";
import HeroSection from "@/components/heroSection";
import HeroSectionMysticDrop from "@/components/heroSectionMysticDrop";
import HighlightSection from "@/components/highlightSection";
import LatestCollectionsSection from "@/components/latestCollectionsSection";
import TestimonialsSection from "@/components/testimonialsSection";
import UpcomingEventsSection from "@/components/upcomingEventsSection";

export default function Home() {
  return (
    <>
      <HeroSectionMysticDrop />
      <HighlightSection />
      <FeaturedArtistsSection />
      <CreateProfileSection />
      {/*<LatestCollectionsSection />*/}
      {/*<TestimonialsSection />*/}
      {/*<UpcomingEventsSection />*/}
    </>
  );
}
