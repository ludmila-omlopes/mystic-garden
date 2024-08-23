'use client';

import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Switch } from "@/components/ui/switch";
import { VERIFIED_ARTIST_PROFILE_IDS } from '@/app/constants';
import { AuctionWithPublicationId } from "../types/auction";
import AuctionCard2 from "@/components/AuctionCard2";
import ClipLoader from "react-spinners/ClipLoader";

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
          setAuctionsData(data);
          setallAuctions(data);
          setLoading(false);
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (error) {
        console.error('There was a problem fetching the auctions:', error);
        if (error instanceof Error) {
          setError(error);
        } else {
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

  const filterPublicationsByCurated = useCallback(() => {
    let filteredAuctions = allAuctions;
    if (showCurated) {
      filteredAuctions = filteredAuctions.filter(auction => {
        const profileId = auction.id.split('-')[0];
        return VERIFIED_ARTIST_PROFILE_IDS.includes(profileId);
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
    const nextIndex = index + 1;
    const newAuctions = allAuctions.slice(nextIndex * ITEMS_PER_PAGE, (nextIndex + 1) * ITEMS_PER_PAGE);
    setAuctionsData((prevData) => [...prevData, ...newAuctions]);
    setIndex(nextIndex);
  }, [index, allAuctions]);

  const handleToggleChange = (value: boolean) => {
    setShowCurated(value);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <h1 className="text-4xl font-bold text-center py-2">Auctions</h1>
      <div className="my-4 flex flex-col sm:flex-row justify-start items-start sm:items-center">
        <div className="mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto flex items-center">
          <Switch checked={showCurated} onCheckedChange={handleToggleChange} />
          <span className="ml-2">Verified</span>
        </div>
      </div>
      <InfiniteScroll
        dataLength={auctionsData.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<ClipLoader color="#36d7b7" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {!loading && !error && auctionsData.slice(0, (index + 1) * ITEMS_PER_PAGE).map((auction) => {
            
            return (
              <><AuctionCard2 auction={auction}/></>
            );

          })}
        </div>
      </InfiniteScroll>
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}
