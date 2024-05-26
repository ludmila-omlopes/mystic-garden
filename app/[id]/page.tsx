'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useProfile, usePublications, Post, PublicationId } from '@lens-protocol/react-web';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getTitle } from '@/utils/utils';
import { FaPlay } from 'react-icons/fa';

const ProfilePage = ({ params }) => {
  const ITEMS_PER_PAGE = 40;
  const { theme } = useTheme();
  const profileHandle = "lens/" + params.id;
  const [selectedTab, setSelectedTab] = useState('created');
  const [publicationIds, setPublicationIds] = useState<PublicationId[]>([]);
  const [isLoadingPublications, setLoadingPublications] = useState(false);

  const { data: profile, error: profileError, loading: profileLoading } = useProfile({ forHandle: profileHandle });
  const profileAvatarUri = (profile?.metadata?.picture && 'optimized' in profile.metadata.picture) ? profile.metadata?.picture?.optimized?.uri  : '';

  useEffect(() => {
    if (profile?.id) {
      const url = new URL('https://lensboard-data.onrender.com/api/get1editionsBonsaiByCreator');
      url.search = new URLSearchParams({ profileId: profile.id }).toString();
      fetch(url.toString())
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            const result = JSON.parse(data.result);
            const publicationsList = result.publicationsList as PublicationId[];
            setPublicationIds(publicationsList);
          }
        })
        .catch(error => console.log('Error:', error));
    }
  }, [profile]);

  const publicationsQueryParams = {
    where: {
      publicationIds: publicationIds.slice(0, ITEMS_PER_PAGE),
    }
  };

  const { data: publications, loading: publicationsLoading, error: publicationsError } = usePublications(publicationsQueryParams);

  const renderMedia = (publication) => {
    const mediaContainerClass = "h-[400px] w-full object-cover rounded-t-lg";

    switch (publication.metadata.__typename) {
      case 'ImageMetadataV3':
        return (
          <img src={publication.metadata.asset?.image?.optimized?.uri} alt="Post" className={mediaContainerClass} />
        );
      case 'VideoMetadataV3':
      case 'AudioMetadataV3':
        return (
          <div className="relative">
            <img src={publication.metadata.asset?.cover?.optimized?.uri} alt="Post cover" className={mediaContainerClass} />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-t-lg">
              <FaPlay className="text-white text-4xl" />
            </div>
          </div>
        );
      default:
        return (
          <div className={mediaContainerClass}>
            Content {/* A default fallback */}
          </div>
        );
    }
  };

  const formatPrice = (publication) => {
    let postPrice: number | null = null;

    if (publication && publication.openActionModules) {
      for (let actionModule of publication.openActionModules) {
        if (actionModule.__typename === "SimpleCollectOpenActionSettings" || actionModule.__typename === "MultirecipientFeeCollectOpenActionSettings" && Number(actionModule.amount.value) > 0) {
          postPrice = Math.floor(Number(actionModule.amount.value));
          break;
        }
      }
    }
    const formattedPrice = postPrice ? `${postPrice} BONSAI` : 'Not for sale';
    return (<p className="font-semibold">{formattedPrice}</p>);
  };

  const isSoldOut = (publication) => {
    return publication && publication.__typename === 'Post' && publication?.stats?.collects > 0;
  };

  const isSaleEnded = (publication) => {
    if (publication && publication.openActionModules) {
      for (let actionModule of publication.openActionModules) {
        if (actionModule.__typename === "SimpleCollectOpenActionSettings" || actionModule.__typename === "MultirecipientFeeCollectOpenActionSettings") {
          const endsAt = actionModule.endsAt;
          if (endsAt && new Date(endsAt) < new Date()) {
            return true;
          }
        }
      }
    }
    return false;
  };

  if (profileLoading) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
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
        <img
          alt="Header Image"
          className="h-full w-full object-cover"
          height="300"
          src={profile.metadata?.coverPicture?.optimized?.uri || '/placeholder.svg'}
          style={{
            aspectRatio: "1200/300",
            objectFit: "cover",
          }}
          width="1200"
        />
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
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Tabs
          className="mb-8 rounded-lg border border-gray-200 bg-white dark:bg-gray-950 dark:border-transparent"
          defaultValue="created"
        >
          <TabsList className="flex justify-center border-b border-gray-200 dark:border-gray-800">
            <TabsTrigger
              className="flex-1 rounded-t-md py-2 px-4 text-sm font-medium transition-colors hover:bg-gray-100 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 dark:hover:bg-gray-800 dark:data-[state=active]:bg-black dark:data-[state=active]:text-white"
              value="created"
              onClick={() => setSelectedTab('created')}
            >
              Created
            </TabsTrigger>
            <TabsTrigger
              className="flex-1 rounded-t-md py-2 px-4 text-sm font-medium transition-colors hover:bg-gray-100 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 dark:hover:bg-gray-800 dark:data-[state=active]:bg-black dark:data-[state=active]:text-white"
              value="collected"
              onClick={() => setSelectedTab('collected')}
            >
              Collected
            </TabsTrigger>
          </TabsList>
          <TabsContent value="created">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {publicationIds.length === 0 && !isLoadingPublications && !publicationsLoading ? (
                <div>No art has been created yet.</div>
              ) : isLoadingPublications ? (
                <div>Loading publications...</div>
              ) : (
                publications?.map((publication) => (
                  <Link href={`/gallery/${publication.id}`} key={publication.id} passHref>
                    <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden relative w-full border border-gray-200 dark:border-gray-800">
                      {renderMedia(publication)}
                      <div className="p-4 flex flex-col h-[80px]">
                        <h3 className="text-lg font-bold mb-2">{getTitle(publication)}</h3>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage alt={profile.metadata?.displayName || "Image by Mystic Garden"} src={profileAvatarUri || '/placeholder-avatar.jpg'} />
                              <AvatarFallback>{profile.metadata?.displayName?.charAt(0) || 'A'}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-500 dark:text-gray-400">@{profile.handle?.localName}</span>
                          </div>
                          <div className="text-lg font-bold">{formatPrice(publication)}</div>
                        </div>
                      </div>
                      {isSoldOut(publication) ? (
                        <div className="absolute top-4 right-4 bg-fuchsia-800 text-white px-3 py-1 rounded-md text-sm font-medium">
                          Sold Out
                        </div>
                      ) : isSaleEnded(publication) && (
                        <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                          Sale Ended
                        </div>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="collected">
            <div className="grid grid-cols-3 gap-4 p-4">
              Coming Soon...
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default ProfilePage;
