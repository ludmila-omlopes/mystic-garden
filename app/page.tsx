'use client';

import FeaturedArtistsSection from "@/components/featuredArtistsSection";
import HeroSection from "@/components/heroSection";
import HighlightSection from "@/components/highlightSection";
import LatestCollectionsSection from "@/components/latestCollectionsSection";
import TestimonialsSection from "@/components/testimonialsSection";
import UpcomingEventsSection from "@/components/upcomingEventsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HighlightSection />
      <FeaturedArtistsSection />
      {/*<LatestCollectionsSection />*/}
      {/*<TestimonialsSection />*/}
      {/*<UpcomingEventsSection />*/}
    </>
  );
}
