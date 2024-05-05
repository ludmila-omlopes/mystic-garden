'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useProfile, usePublications, Post, PublicationId } from '@lens-protocol/react-web';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { TabsClean, TabsCleanList, TabsCleanContent, TabsCleanTrigger } from '@/components/ui/tabs-clean';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import InfiniteScroll from "react-infinite-scroll-component";
import Link from 'next/link';


const ProfilePage = ({ params }) => {
  const ITEMS_PER_PAGE = 40;
  const { theme } = useTheme();
  const profileHandle = "lens/" + params.id;
  const [selectedTab, setSelectedTab] = useState('created');
  //const [publications, setPublications] = useState<Post[]>([]);
  const [isLoadingPublications, setLoadingPublications] = useState(false);

  const [publicationIds, setPublicationIds] = useState<PublicationId[]>([]);

  const { data: profile, error: profileError, loading: profileLoading } = useProfile({ forHandle: profileHandle });

  const profileAvatarUri = (profile?.metadata?.picture && 'optimized' in profile.metadata.picture) ? profile.metadata?.picture?.optimized?.uri  : '';
  //todo: create fallback for cover image

  console.log(profileHandle);

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


  /*const { data, loading: loading2, error: error2, next } = usePublications({
    where: {
      publicationIds: publicationIds.slice(index * ITEMS_PER_PAGE, (index + 1) * ITEMS_PER_PAGE),
    },
  });*/

  //const posts = publications as Post[];
  const isLoading = profileLoading;
  const error = profileError;

  const renderMedia = (publication) => {
    // Ensure the parent container has a fixed aspect ratio
    const mediaContainerClass = "aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 min-w-[250px]";
  
    switch (publication.metadata.__typename) {
      case 'ImageMetadataV3':
        return (
          <div className={mediaContainerClass}>
            <img src={publication.metadata.asset?.image?.optimized?.uri} alt="Post" className="object-cover w-full h-full" />
          </div>
        );
      case 'VideoMetadataV3':
      case 'AudioMetadataV3':
        return (
          <div className={mediaContainerClass}>
            <img src={publication.metadata.asset?.cover?.optimized?.uri} alt="Post cover" className="object-cover w-full h-full" />
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

  // If the profile data or publications are not yet loaded, show a loading indicator

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  if (error && !isLoading) {
    return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
  }

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">Profile not found.</div>;
  }

  return (
    <div className="min-h-screen bg-cover">
    <div className="relative overflow-hidden">
      <img src={profile.metadata?.coverPicture?.optimized?.uri} alt="Cover" className="object-cover w-full h-64" />
    </div>
    <div className="container mx-auto px-4">
      <div className="flex justify-between -mt-16"> {/* Negative margin to pull the avatar up to overlap the cover image */}
        <Avatar className="inline-block" style={{ width: '128px', height: '128px' }}>
          <AvatarImage src={profileAvatarUri} className="w-32 h-32 !important rounded-full" />
          <AvatarFallback className="w-32 h-32 !important rounded-full">
            {profile.handle?.localName.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="py-8">
        <h1 className="text-4xl font-bold">{profile.metadata?.displayName}</h1>
        <h2 className="text-xl">@{profile.handle?.localName}</h2>
        <p className="mt-4">{profile.metadata?.bio}</p>
      </div>
    </div>
    <TabsClean defaultValue="created" className='px-12'>
      <TabsCleanList className="flex">
        <TabsCleanTrigger
          value="created"
          className={`mx-2 py-2 px-4 text-sm font-medium uppercase tracking-wide transition-colors duration-300 ease-in-out ${
            selectedTab === 'created' ? 'text-blue-700 dark:text-blue-300 border-b-2 border-blue-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
          onClick={() => setSelectedTab('created')}
        >
          Created
        </TabsCleanTrigger>
        <TabsCleanTrigger
          value="collected"
          className={`mx-2 py-2 px-4 text-sm font-medium uppercase tracking-wide transition-colors duration-300 ease-in-out ${
            selectedTab === 'collected' ? 'text-blue-700 dark:text-blue-300 border-b-2 border-blue-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
          onClick={() => setSelectedTab('collected')}
        >
          Collected
        </TabsCleanTrigger>
      </TabsCleanList>
      <TabsCleanContent value="created" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
            { publicationIds.length === 0 && !isLoadingPublications ? (
              <div>No art has been created yet.</div>
            ) : isLoadingPublications ? (
              <div>Loading publications...</div>
            ) : (
              publications?.map((publication) => (
        <Link href={`/gallery/${publication.id}`} key={publication.id} passHref>
        <Card key={publication.id} className="flex flex-col">
            <CardContent  className='grid gap-4'>
              {renderMedia(publication)}
              <div>
                <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Buy Now</span>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-300">{formatPrice(publication)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className='justify-between'>
              <div className="flex items-center">
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarImage src={profileAvatarUri} alt={profile.handle?.localName} />
                  <AvatarFallback>{profile.handle?.localName.slice(0,2)}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-light"> {profile.handle?.localName}</span>
              </div>
              <div className="flex items-center">
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarImage src={profileAvatarUri} alt="@Owner" />
                  <AvatarFallback>{profile.handle?.localName.slice(0,2)}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-light"> {profile.handle?.localName}</span>
              </div>
            </CardFooter>
          </Card>
          </Link>
        )))}
      </TabsCleanContent>
      <TabsCleanContent value="collected" className="grid grid-cols-3 gap-4 p-4">
        Coming Soon...
      </TabsCleanContent>
    </TabsClean>
  </div>
  );
};
  
  export default ProfilePage;
