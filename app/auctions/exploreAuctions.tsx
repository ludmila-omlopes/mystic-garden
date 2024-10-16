'use client';

import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { VERIFIED_ARTIST_PROFILE_IDS } from '@/app/constants';
import { AuctionStatus, AuctionWithPublicationId } from "../types/auction";
import AuctionCard2 from "@/components/AuctionCard2";
import ClipLoader from "react-spinners/ClipLoader";
import { getAllAuctions } from "@/lib/auctionUtils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";

export default function ExploreAuctions({ auctions: initialAuctions, initialCursor }) {
  const [auctionsData, setAuctionsData] = useState<AuctionWithPublicationId[]>([]);
  const [completeAuctionsData, setCompleteAuctionsData] = useState<AuctionWithPublicationId[]>(initialAuctions);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(Boolean(initialCursor)); // Initially set based on initialCursor
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [showCurated, setShowCurated] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    AuctionStatus.NOT_STARTED, 
    AuctionStatus.AVAILABLE, 
    AuctionStatus.LIVE_AUCTION
  ]);  // Default selected statuses

  const statusOptions = [
    { value: AuctionStatus.NOT_STARTED, label: 'Not Started' },
    { value: AuctionStatus.AVAILABLE, label: 'Available' },
    { value: AuctionStatus.LIVE_AUCTION, label: 'Live Auction' },
    { value: AuctionStatus.PENDING_SETTLEMENT, label: 'Pending Settlement' },
    { value: AuctionStatus.COLLECTED, label: 'Sold Out' },
  ];

  // Helper function to remove duplicates by auction ID
  const removeDuplicates = (auctions: AuctionWithPublicationId[]) => {
    const seenIds = new Set();
    return auctions.filter((auction) => {
      if (seenIds.has(auction.id)) {
        return false;
      }
      seenIds.add(auction.id);
      return true;
    });
  };

  const filterPublications = useCallback(() => {
    let filteredAuctions = completeAuctionsData;

    if (showCurated) {
      filteredAuctions = filteredAuctions.filter(auction =>
        VERIFIED_ARTIST_PROFILE_IDS.includes(auction.by?.id)
      );
    }

    if (selectedStatuses.length > 0) {
      filteredAuctions = filteredAuctions.filter(auction => selectedStatuses.includes(auction.status));
    }

    // Remove duplicates before setting the state
    setAuctionsData(removeDuplicates(filteredAuctions));

    // Continue fetching more data if filteredAuctions is less than 20 and there's more data to fetch
    if (filteredAuctions.length < 20 && cursor) {
      fetchMoreData(); // Fetch more if necessary
    }

  }, [showCurated, selectedStatuses, completeAuctionsData, cursor]);

  useEffect(() => {
    filterPublications();
  }, [filterPublications]);

  const fetchMoreData = useCallback(async () => {
    if (!cursor) {
      setHasMore(false); // If no cursor, there's no more data to load
      return;
    }

    setLoading(true);
    try {
      const { auctions: newAuctions, nextCursor } = await getAllAuctions(cursor);
      if (newAuctions) {
        setCompleteAuctionsData((prevData) => {
          const combinedData = [...prevData, ...newAuctions];
          return removeDuplicates(combinedData); // Remove duplicates from combined data
        });
      }

      setCursor(nextCursor);
      setHasMore(Boolean(nextCursor)); // Set hasMore based on whether nextCursor exists

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch more auctions'));
      setHasMore(false); // Stop further pagination in case of error
      console.log('Error fetching more auctions:', err);
    } finally {
      setLoading(false);
    }
  }, [cursor]);

  const handleToggleChange = (value: boolean) => {
    setShowCurated(value);
  };

  const handleStatusChange = (value: string[]) => {
    setSelectedStatuses(value);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <h1 className="text-4xl font-bold text-center py-2">Bid on Exclusive 1/1 Auctions</h1>
      <div className="text-center py-2">Participate in Live Auctions from Top Lens Artists - Own Rare Art through Competitive Bidding</div>
      
      {/* Filter Section */}
      <div className="my-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Status Filter */}
        <ToggleGroup
          type="multiple"
          className="flex gap-2 flex-wrap"
          onValueChange={handleStatusChange}
          aria-label="Auction Status Filter"
          value={selectedStatuses}
        >
          {statusOptions.map(option => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              className={`px-4 py-2 rounded border transition-colors 
                ${selectedStatuses.includes(option.value) 
                  ? 'bg-black text-white dark:bg-white dark:text-black' 
                  : 'border-gray-500 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        
        {/* Curated Toggle */}
        <div className="flex justify-center sm:ml-auto">
          <Toggle
            pressed={showCurated}
            onPressedChange={handleToggleChange}
            className={`px-4 py-2 border transition-colors data-[state=on]:bg-black data-[state=on]:text-white
              ${showCurated 
                ? 'bg-black text-white dark:bg-white dark:text-black' 
                : 'border-gray-500 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            Verified
          </Toggle>
        </div>
      </div>
      
      <Separator />

      {/* Auction List */}
      <InfiniteScroll
        dataLength={auctionsData.length}
        endMessage='No more posts.'
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<ClipLoader color="#36d7b7" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {auctionsData.map((auction) => (
            <AuctionCard2 key={auction.id} auction={auction} />
          ))}
        </div>
      </InfiniteScroll>

      {error && <div>Error: {error.message}</div>}
    </div>
  );
}
