'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProfiles, profileId, URI } from '@lens-protocol/react-web';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { VERIFIED_ARTIST_PROFILE_IDS } from '@/app/constants';
//import Autoplay from 'embla-carousel-autoplay';
import AutoScroll from 'embla-carousel-auto-scroll'

export default function FeaturedArtistsSection() {
  type Artist = {
    handle: string | undefined;
    name: string;
    description: string;
    imageUrl: string | URI;
  };

  const [artists, setArtists] = useState<Artist[]>([]);
  const { data: profiles, loading, error } = useProfiles({
    where: {
      profileIds: VERIFIED_ARTIST_PROFILE_IDS.map(id => profileId(id)),
    }
  });

  useEffect(() => {
    if (!loading && profiles) {
      const formattedArtists = profiles.map((profile) => ({
        handle: profile.handle?.localName,
        name: profile.metadata?.displayName || "Unnamed Artist",
        description: profile.handle?.localName || "No handle available",
        imageUrl: profile.metadata?.picture && 'optimized' in profile.metadata?.picture && profile.metadata?.picture?.optimized?.uri || "/images/default-profile.jpg",
      }));
      setArtists(formattedArtists);
    }
  }, [loading, profiles]);

  const chunkArtists = (array, size) => {
    const chunkedArray: Artist[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const artistChunks = chunkArtists(artists, 3);

  return (
    <section
      className="relative w-full py-12 md:py-24 lg:py-32 bg-cover bg-center"
      style={{ backgroundImage: "url(/images/background-image.webp)" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">Featured Artists</h2>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="spinner" />
          </div>
        ) : (
          <Carousel  opts={{ loop: true,}} autoplay={true} autoplayInterval={3000} className="mx-auto max-w-5xl py-12">
            <CarouselContent>
              {artistChunks.map((chunk, index) => (
                <CarouselItem key={index}>
                  <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
                    {chunk.map((artist) => (
                      <Link key={artist.handle} href={`/${artist.handle}`} passHref>
                        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 p-6 dark:bg-gray-950 cursor-pointer">
                          <img
                            src={artist.imageUrl}
                            alt={artist.name}
                            className="h-[128px] w-[128px] object-cover rounded-full"
                          />
                          <div className="space-y-1 text-center">
                            <h3 className="font-semibold">{artist.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              @{artist.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-between mt-6">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        )}
        {error && <div className="text-red-500 text-center">Failed to load featured artists</div>}
      </div>
    </section>
  );
}
