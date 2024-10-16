'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useProfile, Post } from '@lens-protocol/react-web';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import { getPostSellType } from '@/lib/utils';
import { AuctionCard } from '@/components/AuctionCard';
import { BuyNowCard } from '@/components/BuyNowCard';
import ClipLoader from 'react-spinners/ClipLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getCollectedPublicationsByProfile, getPublications } from "@/lib/publicationUtils";

const ProfilePageClient = ({
  profileId,
  allCreatedPublicationIds,
  totalCreated,
  totalCollected,
  collectedPublications: initialCollectedPublications,
  collectedCursorNext: initialCollectedCursorNext,
  createdPublications: initialCreatedPublications,
  createdCursorNext: initialCreatedCursorNext, // Handle cursor for created publications
}) => {
  const ITEMS_PER_PAGE = 40;
  const [selectedTab, setSelectedTab] = useState('created');
  const [collectedPublications, setCollectedPublications] = useState<Post[]>(initialCollectedPublications);
  const [collectedCursorNext, setCollectedCursorNext] = useState(initialCollectedCursorNext);
  const [isLoadingCollectedPublications, setLoadingCollectedPublications] = useState(false);
  const [isLoadingCreatedPublications, setIsLoadingCreatedPublications] = useState(false);
  const [createdCursorNext, setCreatedCursorNext] = useState(initialCreatedCursorNext);
  const [allCreatedPublications, setAllCreatedPublications] = useState<Post[]>(initialCreatedPublications);
  const [hasMoreCreated, setHasMoreCreated] = useState<boolean>(!!createdCursorNext);
  const [hasMoreCollected, setHasMoreCollected] = useState<boolean>(!!collectedCursorNext);

  const { data: profile, error: profileError, loading: profileLoading } = useProfile({ forProfileId: profileId });
  const profileAvatarUri = (profile?.metadata?.picture && 'optimized' in profile.metadata.picture) ? profile.metadata?.picture?.optimized?.uri  : '';

  const fetchMoreCollectedPublications = useCallback(async () => {
    if (!collectedCursorNext) return;
      
    setLoadingCollectedPublications(true);

    const { publications: newPublications, cursorNext: newCursorNext } = await getCollectedPublicationsByProfile(profileId, collectedCursorNext);
    setCollectedPublications((prev) => [...prev, ...newPublications]);
    setCollectedCursorNext(newCursorNext);
    setLoadingCollectedPublications(false);
    setHasMoreCollected(!!newCursorNext);
  }, [collectedCursorNext, profileId]);

  const fetchMoreCreatedPublications = useCallback(async () => {
    if (!createdCursorNext) return;

    setIsLoadingCreatedPublications(true);

    const { publications: newPublications, nextCursor: newCreatedCursorNext } = await getPublications(allCreatedPublicationIds, false, createdCursorNext);
    setAllCreatedPublications((prevPublications) => [...prevPublications, ...newPublications]);
    setCreatedCursorNext(newCreatedCursorNext);
    setIsLoadingCreatedPublications(false);
    setHasMoreCreated(!!newCreatedCursorNext);
  }, [allCreatedPublicationIds, createdCursorNext]);

  if (profileLoading) {
    return <div className="flex justify-center items-center h-screen"><ClipLoader color="#36d7b7" /></div>;
  }

  if (profileError && !profileLoading) {
    return <div className="flex justify-center items-center h-screen">Error: {profileError.message}</div>;
  }

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">Profile not found.</div>;
  }

  return (
    <div className="w-full">
      {/* Profile header and bio */}
      <div className="relative h-[200px] sm:h-[300px] lg:h-[300px]">
        <img alt="Header Image" className="h-full w-full object-cover" height="300" src={profile.metadata?.coverPicture?.optimized?.uri || '/images/background-image.webp'} width="1200" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6 sm:p-8 lg:p-10">
          <div className="flex items-end gap-4">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
              <AvatarImage alt={profile.metadata?.displayName || "Profile Avatar"} src={profileAvatarUri || '/placeholder-avatar.jpg'} />
              <AvatarFallback>{profile.metadata?.displayName?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1 text-white">
              <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">{profile.metadata?.displayName || 'Unnamed Artist'}</h1>
              <p className="text-sm sm:text-base lg:text-lg">@{profile.handle?.localName}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-gray max-w-3xl mx-auto dark:prose-invert">
          <ReactMarkdown>{profile.metadata?.bio || 'This artist has not provided a bio.'}</ReactMarkdown>
        </div>
      </div>

      {/* Display Total Counts */}
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <h2 className="text-xl font-bold">{totalCreated}</h2>
            <p className="text-sm text-gray-500">Total Created</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold">{totalCollected.toString()}</h2>
            <p className="text-sm text-gray-500">Total Collected</p>
          </div>
        </div>
      </div>

      {/* Tabbed Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Tabs className="mb-8 rounded-lg border border-gray-200 bg-white dark:bg-gray-950 dark:border-transparent" defaultValue="created">
          <TabsList className="flex justify-center border-b border-gray-200 dark:border-gray-800">
            <TabsTrigger value="created" onClick={() => setSelectedTab('created')}>Created</TabsTrigger>
            <TabsTrigger value="collected" onClick={() => setSelectedTab('collected')}>Collected</TabsTrigger>
          </TabsList>
          <TabsContent value="created">
            <InfiniteScroll
              dataLength={allCreatedPublications.length}
              next={fetchMoreCreatedPublications}
              hasMore={hasMoreCreated}
              loader={<ClipLoader color="#36d7b7" />}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {allCreatedPublications.length === 0 && !isLoadingCreatedPublications ? (
                  <div>No art has been created yet.</div>
                ) : (
                  allCreatedPublications.map((publication) => (
                    <div key={publication.id}>
                      {getPostSellType(publication as Post) === 'auction' ? (
                        <AuctionCard publication={publication as Post} />
                      ) : (
                        <BuyNowCard publication={publication as Post} />
                      )}
                    </div>
                  ))
                )}
              </div>
            </InfiniteScroll>
          </TabsContent>
          <TabsContent value="collected">
            <InfiniteScroll
              dataLength={collectedPublications.length}
              next={fetchMoreCollectedPublications}
              hasMore={hasMoreCollected}
              loader={<ClipLoader color="#36d7b7" />}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {collectedPublications.length === 0 && !isLoadingCollectedPublications ? (
                  <div>No collected art yet.</div>
                ) : (
                  collectedPublications.map((publication) => (
                    <div key={publication.id}>
                      {getPostSellType(publication as Post) === 'auction' ? (
                        <AuctionCard publication={publication as Post} />
                      ) : (
                        <BuyNowCard publication={publication as Post} />
                      )}
                    </div>
                  ))
                )}
              </div>
            </InfiniteScroll>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default ProfilePageClient;
