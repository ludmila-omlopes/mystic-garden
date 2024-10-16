'use client';

import React, { useState, useCallback, useMemo, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { ClipLoader } from "react-spinners";
import { Post } from "@lens-protocol/react-web";
import { BuyNowCard } from "@/components/BuyNowCard";
import { getBuyNowPrice, getPublications } from "@/lib/publicationUtils";

export default function ExploreClient({
  initialPublications,
  allPublicationIds,
}) {
  const [allBuyNowPublications, setAllBuyNowPublications] = useState(initialPublications);
  const [nextCursor, setNextCursor] = useState<number | null>(0); // Start with cursor 0
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [showCurated, setShowCurated] = useState(true); // Verified filter default to true
  const [filterExpensiveBuyNow, setFilterExpensiveBuyNow] = useState(true);
  const [showSoldOut, setShowSoldOut] = useState(false);

  const filterOptions = [
    { value: "showExpensive", label: "Buy Now ≥ 5,000 BONSAI" },
    { value: "showSoldOut", label: "Show Sold Out" },
  ];

  const selectedStatuses = [
    filterExpensiveBuyNow ? "showExpensive" : "",
    showSoldOut ? "showSoldOut" : "",
  ];

  const handleFilterChange = (value: string[]) => {
    setFilterExpensiveBuyNow(value.includes("showExpensive"));
    setShowSoldOut(value.includes("showSoldOut"));
  };

  // Helper to remove duplicates from an array of publications
  const removeDuplicates = (publications: Post[]) => {
    const uniqueIds = new Set();
    return publications.filter((publication) => {
      if (uniqueIds.has(publication.id)) {
        return false;
      }
      uniqueIds.add(publication.id);
      return true;
    });
  };

  const applyFilters = useCallback(() => {
    let filteredList = allBuyNowPublications;

    // Filter by price ≥ 5000 BONSAI
    if (filterExpensiveBuyNow) {
      filteredList = filteredList.filter((publication) => {
        const buyNowPrice = getBuyNowPrice(publication);
        return buyNowPrice && buyNowPrice >= 5000;
      });
    }

    // Filter by sold-out status
    if (!showSoldOut) {
      filteredList = filteredList.filter(
        (publication) => publication.stats.countOpenActions === 0
      );
    }

    return filteredList;
  }, [allBuyNowPublications, filterExpensiveBuyNow, showSoldOut]);

  const fetchMoreData = useCallback(async () => {
    if (nextCursor === null) {
      console.log('No more data to fetch');
      setHasMore(false);
      return;
    }

    try {
      const { publications: newPublications, nextCursor: newNextCursor } = await getPublications(allPublicationIds, showCurated, nextCursor);
      
      console.log('Fetched data:', newPublications);

      setAllBuyNowPublications((prevPublications) => {
        // Combine previous publications with new ones and remove duplicates
        const combinedPublications = [...prevPublications, ...newPublications];
        console.log('Combined publications length:', combinedPublications.length);
        return removeDuplicates(combinedPublications);
      });

      setNextCursor(newNextCursor); // Update cursor for next fetch
      setHasMore(newNextCursor !== null); // Set hasMore to false if no more data

    } catch (error) {
      console.error("Error fetching more data:", error);
      setHasMore(false);
    }
  }, [nextCursor, showCurated]);

  // Apply filters and memoize the filtered results
  const filteredPublications = useMemo(() => {
    const filteredList = applyFilters();
    console.log('Filtered Publications Length:', filteredList.length);
    return filteredList;
  }, [applyFilters]);

  // Automatically fetch more data if the filtered results are too small
  useEffect(() => {
    console.log('filteredPublications.length:', filteredPublications.length);
    if (filteredPublications.length < 10 && hasMore) {
      console.log('Filtered publications below threshold, fetching more data...');
      fetchMoreData();
    }
  }, [filteredPublications, hasMore, fetchMoreData]);

  // Reset the cursor and re-fetch data when "showCurated" is toggled
  useEffect(() => {
    console.log('Curated filter changed. Refetching...');
    setNextCursor(0);  // Reset cursor to fetch from the beginning
    setHasMore(true);   // Ensure more data can be fetched
    setAllBuyNowPublications([]);  // Clear the current data
    fetchMoreData();  // Fetch the first chunk of data
  }, [showCurated]);  // Refetch when the 'curated' state changes

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <h1 className="text-4xl font-bold text-center py-2">Discover Exclusive Buy Now Artworks</h1>
      <div className="text-center py-2">Instantly Own 1/1 Pieces from Lens Artists - No Auctions, Just Collect</div>
      <div className="my-4 flex flex-col sm:flex-row justify-between items-center w-full">
        {/* Filters on the left */}
        <ToggleGroup
          type="multiple"
          className="flex gap-2"
          onValueChange={handleFilterChange}
          value={selectedStatuses}
          aria-label="Filter Options"
        >
          {filterOptions.map(option => (
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

        {/* Verified button on the far right */}
        <div className="ml-auto">
          <Toggle
            pressed={showCurated}
            onPressedChange={setShowCurated}
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

      <InfiniteScroll
        dataLength={allBuyNowPublications.length} // Total number of loaded items, not just filtered
        next={fetchMoreData}
        hasMore={hasMore}
        endMessage='No more posts.'
        loader={<ClipLoader color="#36d7b7" />}
      >
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPublications.map((buyNow) => (
              <BuyNowCard key={buyNow.id} publication={buyNow} />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}
