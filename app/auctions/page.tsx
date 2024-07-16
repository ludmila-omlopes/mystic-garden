'use client';

import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, formatDistance } from 'date-fns';
import Link from 'next/link';
import { FEATURED_ARTIST_PROFILE_IDS } from '@/app/constants';

interface AuctionWithPublicationId {
  id: string;
  metadata: {
    asset: {
      image?: {
        optimized?: {
          uri: string;
        };
      };
      cover?: {
        optimized?: {
          uri: string;
        };
      };
      video?: {
        optimized?: {
          uri: string;
        };
      };
      audio?: {
        optimized?: {
          uri: string;
        };
      };
    };
    title: string;
  };
  createdAt: string;
  by: {
    id: string;
    handle: {
      localName: string;
      suggestedFormatted: {
        localName: string;
      };
    };
    metadata: {
      picture: {
        optimized?: {
          uri: string;
        };
      };
    };
  };
  availableSinceTimestamp: string;
  startTimestamp: string;
  duration: number;
  minTimeAfterBid: number;
  endTimestamp: string;
  reservePrice: number;
  minBidIncrement: number;
  winningBid: number;
  referralFee: number;
  currency: string;
  winnerProfileId: string;
  onlyFollowers: boolean;
  collected: boolean;
  feeProcessed: boolean;
  tokenData: {
    name: string;
    symbol: string;
    royalty: number;
  };
}

export default function Explore() {
  const ITEMS_PER_PAGE = 20;
  const [auctionsData, setAuctionsData] = useState<AuctionWithPublicationId[]>([]);
  const [allAuctions, setallAuctions] = useState<AuctionWithPublicationId[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showCurated, setShowCurated] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('/api/getAuctions'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        const data = responseData.data;
        if (data) {
          console.log("data = ", data);
          setAuctionsData(data);
          setallAuctions(data);
          setLoading(false);
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (error) {
        console.error('There was a problem fetching the auctions:', error);
        if (error instanceof Error) {
          setError(error); // This is now safe
        } else {
          // If it's not an Error instance, you can either set a new Error or pass null
          setError(new Error('An unknown error occurred'));
        }
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  useEffect(() => {
    setHasMore(auctionsData.length > (index + 1) * ITEMS_PER_PAGE);
  }, [auctionsData, index]);

  const getAuctionStatusAndTimeLeft = (auction: AuctionWithPublicationId) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const availableSinceTimestamp = parseInt(auction.availableSinceTimestamp);
    const endTimestamp = availableSinceTimestamp + auction.duration;
    const auctionStart = new Date(availableSinceTimestamp * 1000);
    const auctionEnd = new Date(endTimestamp * 1000);
    let auctionStatus = "Not started";
    let timeLeft = formatDistanceToNow(auctionStart, { includeSeconds: true });

    if (currentTime >= availableSinceTimestamp) {
        if (parseInt(auction.startTimestamp) === 0) {
            auctionStatus = "Active but not started";
        } else if (currentTime <= endTimestamp) {
            auctionStatus = "Active auction";
            timeLeft = formatDistanceToNow(auctionEnd, { includeSeconds: true });
        } else if (BigInt(auction.winnerProfileId) !== 0n && !auction.collected) {
            auctionStatus = "Auction ended, pending collection";
        } else if (auction.collected) {
            auctionStatus = "Art collected";
        }
    }

    if (auctionStatus === "Not started" && currentTime < availableSinceTimestamp && (availableSinceTimestamp - currentTime) < 86400) {
        timeLeft = formatDistance(currentTime * 1000, auctionStart, { includeSeconds: true });
    }

    return { auctionStatus, timeLeft };
  };

  const fetchWinnerProfile = async (profileId: string) => {
    // Fetch the winner's profile information from the appropriate endpoint
    // This is a placeholder and should be replaced with the actual API call
    const response = await fetch(`/api/getProfile?profileId=${profileId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const profileData = await response.json();
    return profileData;
  };

  const filterPublicationsByCurated = useCallback(() => {
    let filteredAuctions = allAuctions;
    if (showCurated) {
        filteredAuctions = filteredAuctions.filter(auction => {
          const profileId = auction.id.split('-')[0];
          return FEATURED_ARTIST_PROFILE_IDS.includes(profileId);
        });
      }
      setAuctionsData(filteredAuctions);
      setIndex(0); // Reset pagination index
      //setPublications([]); // Reset publications when filter changes
  }, [showCurated, allAuctions]);

  useEffect(() => {
    filterPublicationsByCurated();
  }, [showCurated, filterPublicationsByCurated]);

  const fetchMoreData = useCallback(() => {
    if (hasMore) {
      setIndex(prevIndex => prevIndex + 1);
    }
  }, [hasMore]);

  const handleToggleChange = (value: boolean) => {
    setShowCurated(value);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <h1 className="text-4xl font-bold text-center py-2">Auctions</h1>
      <div className="my-4 flex flex-col sm:flex-row justify-start items-start sm:items-center">
        <div className="mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto flex items-center">
          <Switch checked={showCurated} onCheckedChange={handleToggleChange} />
          <span className="ml-2">Curated</span>
        </div>
      </div>
      <InfiniteScroll
        dataLength={auctionsData.length || 0}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {!loading && !error && auctionsData.slice(0, (index + 1) * ITEMS_PER_PAGE).map((auction) => {
            const { auctionStatus, timeLeft } = getAuctionStatusAndTimeLeft(auction);
            const isVideo = !!auction.metadata.asset.video?.optimized?.uri;
            const isAudio = !!auction.metadata.asset.audio?.optimized?.uri;
            const imageUrl = auction.metadata.asset.image?.optimized?.uri ||
              auction.metadata.asset.cover?.optimized?.uri ||
              auction.metadata.asset.video?.optimized?.uri ||
              auction.metadata.asset.audio?.optimized?.uri ||
              "/no-image-available.jpg";

            return (
              <div key={auction.id} className="bg-background rounded-lg overflow-hidden shadow-lg">
                <div className="flex items-center mb-2 p-4">
                  <Avatar className="w-6 h-6 mr-2">
                    <AvatarImage src={auction.by.metadata.picture?.optimized?.uri || "/placeholder-user.jpg"} />
                    <AvatarFallback>{auction.by.handle.localName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-s font-medium">{auction.by.handle.localName || auction.by.handle.suggestedFormatted.localName}</div>
                </div>
                <div className="relative">
                  {isVideo ? (
                    <video src={auction?.metadata?.asset?.video?.optimized?.uri} controls className="w-full h-96 object-cover"></video>
                  ) : (
                    <img src={imageUrl} alt={auction.metadata.title} className="w-full h-96 object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <div className="text-lg font-bold mb-2">{auction.metadata.title}</div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center mb-4">
                    {auctionStatus === "Active auction" ? (
                      <>
                        <div>
                          <div className="text-xs text-muted-foreground">Reserve Price</div>
                          <div className="text-base font-bold">{auction.reservePrice / 1e18} BONSAI</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Current Bid</div>
                          <div className="text-base font-bold">{auction.winningBid / 1e18} BONSAI</div>
                        </div>
                      </>
                    ) : auctionStatus === "Active but not started" ? (
                      <>
                        <div>
                          <div className="text-xs text-muted-foreground">Reserve Price</div>
                          <div className="text-base font-bold">{auction.reservePrice / 1e18} BONSAI</div>
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                          Place the first bid!
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="text-xs text-muted-foreground">Winning Bid</div>
                          <div className="text-base font-bold">{auction.winningBid / 1e18} BONSAI</div>
                        </div>
                        <div className="flex items-center">
                          {/* Placeholder for winner's profile information */}
                          {/* TODO: Fetch and display the winner's profile information */}
                        </div>
                      </>
                    )}
                  </div>
                  {auctionStatus === "Active auction" || auctionStatus === "Active but not started" ? (
                    <div className="flex gap-2">
                      <Link href={`/gallery/${auction.id}`} passHref>
                        <Button variant="default" size="sm">
                          Place Bid
                        </Button>
                      </Link>
                      <Link href={`/gallery/${auction.id}`} passHref>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="default" size="sm" disabled>
                        Sold Out
                      </Button>
                      <Link href={`/gallery/${auction.id}`} passHref>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}
