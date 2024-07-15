'use client';

import { useEffect, useState, useMemo } from 'react';
import { useProfiles, useRevenueFromPublications, useSession, useOwnedHandles, useUnlinkHandle, SessionType, useLinkHandle, useLogin, useLogout, useProfilesManaged, ProfileId, usePublications, Post } from '@lens-protocol/react-web';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { getPointsByWallet } from '@/lib/pointsSystem';
import { getPublicationAsset, isCuratedProfile } from '@/lib/utils'; // Import the function
import { getAllCreatedPublicationsByCreator } from '@/lib/publications'; // Import the function
import { PublicationId } from '@lens-protocol/metadata';

const ITEMS_PER_PAGE = 10;

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ImageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TrophyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function ProfilePage() {
  const { address } = useAccount();
  const { data: handlesData } = useOwnedHandles({ for: address ?? '' });
  const { execute: exLogin, data: loginData } = useLogin();
  const { execute: exLogout, loading: loadingLogout } = useLogout();
  const { data: managedProfiles, loading: loadingProfiles } = useProfilesManaged({ for: address ?? '' });
  const { execute: exUnlink, error: errorUnlink, loading: loadingUnlink } = useUnlinkHandle();
  const { execute: exLink, error: errorLink, loading: loadingLink } = useLinkHandle();
  const { data: sessionData, error: sessionError, loading: sessionLoading } = useSession();
  const { data: revenueData, error: revenueError, loading: revenueLoading } = useRevenueFromPublications({ for: ( sessionData?.authenticated && sessionData.type === SessionType.WithProfile ) ? sessionData.profile.id : "0x00" as ProfileId });
  const [points, setPoints] = useState(0);
  const [revenueByToken, setRevenueByToken] = useState<{ [key: string]: { total: number, symbol: string } }>({});
  const [totalFiatRevenue, setTotalFiatRevenue] = useState(0);
  const [createdPublications, setCreatedPublications] = useState<PublicationId[]>([]);
  const [index, setIndex] = useState(0);
  const [fetchedPublications, setFetchedPublications] = useState(false);

  useEffect(() => {
    async function fetchPoints() {
      var points = 0;
      if (sessionData?.authenticated && sessionData.type === SessionType.WithProfile) {
        points = await getPointsByWallet(sessionData.address);
        console.log("points: ", points);
      }
      setPoints(points);
    }
    fetchPoints();
  }, [sessionData, address]);

  useEffect(() => {
    if (revenueData) {
      const tokenRevenue: { [key: string]: { total: number, symbol: string } } = {};
      let fiatTotal = 0;

      revenueData.forEach((publicationRevenue) => {
        publicationRevenue.revenue.forEach((revenueAggregate) => {
          const { value, asset, rate } = revenueAggregate.total;

          console.log("revenueAggregate value: ", JSON.stringify(value));
          console.log("revenueAggregate asset: ", JSON.stringify(asset.symbol));

          if (!tokenRevenue[asset.contract.address]) {
            tokenRevenue[asset.contract.address] = { total: 0, symbol: asset.symbol };
          }
          tokenRevenue[asset.contract.address].total += parseFloat(value);

          if (rate) {
            fiatTotal += parseFloat(rate.value);
          }
        });
      });

      setRevenueByToken(tokenRevenue);
      console.log("tokenRevenue size: ", revenueData.length);
      setTotalFiatRevenue(fiatTotal);
    }
  }, [revenueData]);

  useEffect(() => {
    async function fetchCreatedPublications() {
      if (sessionData?.authenticated && sessionData.type === SessionType.WithProfile && !fetchedPublications) {
        try {
          const publications = await getAllCreatedPublicationsByCreator(sessionData.profile.id) as PublicationId[];
          setCreatedPublications(publications);
          setFetchedPublications(true);
        } catch (error) {
          console.error('Error fetching created publications:', error);
        }
      }
    }
    fetchCreatedPublications();
  }, [sessionData, fetchedPublications]);

  const whereCondition = useMemo(() => ({
    where: {
      publicationIds: createdPublications.slice(index * ITEMS_PER_PAGE, (index + 1) * ITEMS_PER_PAGE),
    },
  }), [createdPublications, index]);

  const { data: publicationsData, loading: loadingPublications, error: publicationsError, next } = usePublications(whereCondition);

  const login = (profileId: ProfileId) => {
    exLogin({
      address: address ?? '',
      profileId: profileId,
    });
  };

  const logout = () => {
    exLogout();
    window.location.reload();
  };

  const switchProfile = (profileId: ProfileId) => {
    exLogin({
      address: address ?? '',
      profileId: profileId,
    });
  };

  const handleNextPage = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousPage = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const hasNextPage = createdPublications.length > (index + 1) * ITEMS_PER_PAGE;
  const hasPreviousPage = index > 0;

  switch (sessionData?.type) {
    case SessionType.Anonymous:
      return (
        <main className="p-6">
          <Avatar className="mr-4 w-24 h-24">
            <AvatarImage src="/path/to/your/fallback/image.png" />
          </Avatar>
          <p>Anonymous Session</p>
        </main>
      );
    case SessionType.JustWallet:
      return (
        <main className="p-6">
          <Avatar className="mr-4 w-24 h-24">
            <AvatarImage src="/path/to/your/fallback/image.png" />
          </Avatar>
          <p>Wallet-Only Session</p>
        </main>
      );
    case SessionType.WithProfile:
      return (
        <div className="flex min-h-screen flex-col bg-background mt-20">
          <div className="container mx-auto flex flex-col gap-8 px-4 py-8 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex flex-col items-center gap-2 md:items-start">
                <Avatar className="h-24 w-24">
                  {sessionData.profile?.metadata?.picture?.__typename === 'ImageSet' ? (
                    <AvatarImage src={sessionData.profile.metadata.picture.optimized?.uri} />
                  ) : (
                    <AvatarFallback>JP</AvatarFallback>
                  )}
                </Avatar>
                <div className="grid gap-1 text-center md:text-left">
                  <div className="font-bold">@{sessionData.profile?.handle?.localName}</div>
                  <div className="text-muted-foreground">{sessionData.profile?.metadata?.displayName}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{sessionData.profile?.stats?.followers} Followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{sessionData.profile?.stats?.following} Following</span>
                </div>
                {isCuratedProfile(sessionData.profile.id) && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      <StarIcon className="h-3 w-3 text-primary mr-2" />
                      <span className="text-xs font-medium">Curated</span>
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <TrophyIcon className="h-6 w-6 text-primary" />
                  <span className="font-medium">Points Earned</span>
                </div>
                <span className="text-2xl font-bold">{points}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <DollarSignIcon className="h-6 w-6 text-primary" />
                  <span className="font-medium">Revenue</span>
                </div>
                <div className="text-2xl font-bold">
                  <div>Soon...</div>
                </div>
              </div>
              <Link href="#" className="flex items-center justify-between rounded-lg border p-4" prefetch={false}>
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-6 w-6 text-primary" />
                  <span className="font-medium">Collects</span>
                </div>
                <span className="text-2xl font-bold">{sessionData.profile?.stats?.collects}</span>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  <span className="text-lg font-bold">Created Arts</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                {publicationsData && publicationsData.map((publication) => (
                  <Link href={'/gallery/'+publication.id} >
                  <img
                    key={publication.id}
                    src={getPublicationAsset(publication as Post).src}
                    width={200}
                    height={200}
                    alt="Created Art"
                    className="aspect-square rounded-lg object-cover"
                  />
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button hidden={!hasPreviousPage} onClick={handlePreviousPage}>Previous</button>
              <button hidden={!hasNextPage} onClick={handleNextPage}>Next</button>
            </div>
          </div> 
        </div>
      );

    default:
      return <p>Something went wrong.</p>;
  }
}
