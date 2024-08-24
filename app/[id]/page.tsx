'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { useProfile, usePublications, Post, PublicationId } from '@lens-protocol/react-web';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import { getPostSellType, isGenesisDropArtist } from '@/lib/utils';
import { getAllCreatedPublicationsByCreator } from '@/lib/publications';
import { AuctionCard } from '@/components/AuctionCard';
import { BuyNowCard } from '@/components/BuyNowCard';
import ClipLoader from 'react-spinners/ClipLoader';
import ShineBorder from '@/components/magicui/shine-border';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const ProfilePage = ({ params }) => {
  const ITEMS_PER_PAGE = 40;
  const profileHandle = "lens/" + params.id;
  const [selectedTab, setSelectedTab] = useState('created');
  const [publicationIds, setPublicationIds] = useState<PublicationId[]>([]);
  const [collectedPublications, setCollectedPublications] = useState<Post[]>([]);
  const [isLoadingPublications, setLoadingPublications] = useState(false);
  const [isLoadingCollectedPublications, setLoadingCollectedPublications] = useState(false);
  const [totalCreated, setTotalCreated] = useState(0);  // State for total created count
  const [totalCollected, setTotalCollected] = useState(0);  // State for total collected count

  const { data: profile, error: profileError, loading: profileLoading } = useProfile({ forHandle: profileHandle });
  const profileAvatarUri = (profile?.metadata?.picture && 'optimized' in profile.metadata.picture) ? profile.metadata?.picture?.optimized?.uri  : '';

  useEffect(() => {
    if (profile) {
      setLoadingPublications(true);
      setLoadingCollectedPublications(true);

      Promise.all([
        getAllCreatedPublicationsByCreator(profile.id),
        fetch(`/api/getCollectedPublicationsByProfile?profileId=${profile.id}`).then(res => res.json())
      ])
      .then(([createdPublications, collectedData]) => {
        setPublicationIds(createdPublications as PublicationId[]);
        setCollectedPublications(collectedData.publications);
        setTotalCreated(createdPublications.length);  // Set total created count
        setTotalCollected(collectedData.publications.length);  // Set total collected count
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoadingPublications(false);
        setLoadingCollectedPublications(false);
      });
    }
  }, [profile]);

  const publicationsQueryParams = {
    where: {
      publicationIds: publicationIds.slice(0, ITEMS_PER_PAGE),
    }
  };

  const { data: publications, loading: publicationsLoading, error: publicationsError } = usePublications(publicationsQueryParams);

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
      <div className="relative h-[200px] sm:h-[300px] lg:h-[300px]">
        {/* Header Image */}
        <img alt="Header Image" className="h-full w-full object-cover" height="300" src={profile.metadata?.coverPicture?.optimized?.uri || '/images/background-image.webp'} style={{ aspectRatio: "1200/300", objectFit: "cover" }} width="1200" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6 sm:p-8 lg:p-10">
          <div className="flex items-end gap-4">
            <HoverCard>
              {isGenesisDropArtist(profile.id) ? (
                <HoverCardTrigger>
                  <HoverCardContent className="text-sm">{profile.metadata?.displayName} is a Genesis Artist.</HoverCardContent>
                  <ShineBorder color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} borderRadius={99} className="h-22 w-22 sm:h-26 sm:w-26 lg:h-30 lg:w-30 p-1" borderWidth={8}>
                    <Avatar className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                      <AvatarImage alt={profile.metadata?.displayName || "Profile Avatar"} src={profileAvatarUri || '/placeholder-avatar.jpg'} />
                      <AvatarFallback>{profile.metadata?.displayName?.charAt(0) || 'A'}</AvatarFallback>
                    </Avatar>
                  </ShineBorder>
                </HoverCardTrigger>
              ) : (
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                  <AvatarImage alt={profile.metadata?.displayName || "Profile Avatar"} src={profileAvatarUri || '/placeholder-avatar.jpg'} />
                  <AvatarFallback>{profile.metadata?.displayName?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
              )}
            </HoverCard>
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
            <h2 className="text-xl font-bold">{totalCollected}</h2>
            <p className="text-sm text-gray-500">Total Collected</p>
          </div>
        </div>
      </div>
  
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Tabs className="mb-8 rounded-lg border border-gray-200 bg-white dark:bg-gray-950 dark:border-transparent" defaultValue="created">
          <TabsList className="flex justify-center border-b border-gray-200 dark:border-gray-800">
            <TabsTrigger value="created" onClick={() => setSelectedTab('created')}>Created</TabsTrigger>
            <TabsTrigger value="collected" onClick={() => setSelectedTab('collected')}>Collected</TabsTrigger>
          </TabsList>
          <TabsContent value="created">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {publicationIds.length === 0 && !isLoadingPublications && !publicationsLoading ? (
                <div>No art has been created yet.</div>
              ) : isLoadingPublications || publicationsLoading ? (
                <div className="flex justify-center items-center w-full h-40"><ClipLoader color="#36d7b7" /></div>
              ) : (
                publications?.map((publication) => (
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
          </TabsContent>
          <TabsContent value="collected">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {(!collectedPublications || collectedPublications.length === 0) && !isLoadingCollectedPublications ? (
                <div>No collected art yet.</div>
              ) : isLoadingCollectedPublications ? (
                <div className="flex justify-center items-center w-full h-40"><ClipLoader color="#36d7b7" /></div> 
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
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );  
};

export default ProfilePage;
