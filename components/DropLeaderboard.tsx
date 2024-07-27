'use client'

import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { ActiveBidsQueryDocument, ActiveBidsQueryQuery, execute } from '../.graphclient';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProfileId, profileId, useProfiles } from "@lens-protocol/react-web";
import { convertProfileIdToHex, formatToLensHex, getProfileAvatarImageUri } from "@/lib/utils";
import Link from "next/link";

const Leaderboard = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [bidsData, setBidsData] = useState<ActiveBidsQueryQuery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileIds, setProfileIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchBids = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await execute(ActiveBidsQueryDocument, { endTimestamp: currentTimestamp });
        setBidsData(result.data);
        const ids = result.data.bidPlaceds.map(bid => convertProfileIdToHex(bid.bidderProfileId));
        setProfileIds(ids);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [currentTimestamp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000).toString());
    }, 60000); // Update the timestamp every minute

    return () => clearInterval(interval);
  }, []);

  const { data: profilesData, loading: profilesLoading, error: profilesError } = useProfiles({
    where: { profileIds: profileIds.length > 0 ? profileIds.map(id => profileId(id)) : ['0x00' as ProfileId] }
  });

  if (loading || profilesLoading) return <ClipLoader size={50} color={"#A07CFE"} loading={loading || profilesLoading} />;
  if (error) return <p>Error: {error}</p>;
  if (profilesError) return <p>Error: {profilesError.message}</p>;

  const bids = bidsData?.bidPlaceds || [];

  // Sort bids by timestamp
  const sortedBids = [...bids].sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));

  const findOutbidProfile = (currentBid) => {
    const index = sortedBids.findIndex(bid => bid.id === currentBid.id);
    for (let i = index - 1; i >= 0; i--) {
      const previousBid = sortedBids[i];
      if (previousBid.profileId === currentBid.profileId && previousBid.pubId === currentBid.pubId) {
        return previousBid.bidderProfileId;
      }
    }
    return null;
  };

  const topBidders = bids
    .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
    .slice(0, 3); // Display only top 3 bidders

  const latestBids = bids
    .sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
    .slice(0, 3); // Display only latest 3 bids

  const getProfile = (id: string) => profilesData?.find(profile => profile.id === convertProfileIdToHex(id));

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Top Bidders</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {topBidders.map((bid) => {
              const profile = getProfile(bid.bidderProfileId);
              const hexPublicationId = formatToLensHex(BigInt(bid.profileId), BigInt(bid.pubId));
              return (
                <Link key={bid.id} href={`/gallery/${hexPublicationId}`} className="rounded-lg bg-muted p-4 block">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={profile ? getProfileAvatarImageUri(profile) : ""} />
                      <AvatarFallback>{profile?.handle?.localName.slice(-2)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <h3 className="text-lg font-semibold">@{profile?.handle?.localName}</h3>
                      <p className="text-sm text-muted-foreground">Highest Bid: {(parseFloat(bid.amount) / 1e18).toFixed(2)} BONSAI</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Latest Bids</h2>
          <div className="mt-4 space-y-4">
            {latestBids.map((bid) => {
              const profile = getProfile(bid.bidderProfileId);
              const outbidProfileId = findOutbidProfile(bid);
              const outbidProfile = getProfile(outbidProfileId);
              const hexPublicationId = formatToLensHex(BigInt(bid.profileId), BigInt(bid.pubId));
              return (
                <Link key={bid.id} href={`/gallery/${hexPublicationId}`} className="flex items-center gap-4 block">
                  <Avatar>
                    <AvatarImage src={profile ? getProfileAvatarImageUri(profile) : ""} />
                    <AvatarFallback>{profile?.handle?.localName.slice(-2)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <h3 className="text-lg font-semibold">@{profile?.handle?.localName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Bid: {(parseFloat(bid.amount) / 1e18).toFixed(2)} BONSAI
                      {outbidProfile && ` (outbid @${outbidProfile.handle?.localName})`}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
