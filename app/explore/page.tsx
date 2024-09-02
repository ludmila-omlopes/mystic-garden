'use client';

import React, { useState, useEffect, useMemo, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePublications, PublicationId, Post, AnyPublication } from '@lens-protocol/react-web';
import GalleryPost from '@/components/galleryPost';
import { Switch } from "@/components/ui/switch";
import { VERIFIED_ARTIST_PROFILE_IDS } from '@/app/constants';
import { getAllPublicationIds, getBuyNowPrice } from "@/lib/publications";
import { ClipLoader } from "react-spinners";
import { getPostSellType } from "@/lib/utils";

export default function Explore() {
  const ITEMS_PER_PAGE = 30;
  const [allPublicationIds, setAllPublicationIds] = useState<PublicationId[]>([]);
  const [publicationIds, setPublicationIds] = useState<PublicationId[]>([]);
  const [publications, setPublications] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showCurated, setShowCurated] = useState(true);
  const [filterExpensiveBuyNow, setFilterExpensiveBuyNow] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await getAllPublicationIds();
        const pubIds = data as PublicationId[];
        setPublicationIds(pubIds);
        setAllPublicationIds(pubIds);
        setLoading(false);
      } catch (error) {
        console.error('There was a problem fetching the publications:', error);
        setError(error instanceof Error ? error : new Error('An unknown error occurred'));
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const whereCondition = useMemo(() => ({
    where: {
      publicationIds: publicationIds.slice(index * ITEMS_PER_PAGE, (index + 1) * ITEMS_PER_PAGE),
    }, 
  }), [publicationIds, index]);

  const { data, loading: loading2, error: error2, next } = usePublications(whereCondition);

  useEffect(() => {
    if (!loading2 && data) {
      const posts = data.filter((publication: AnyPublication): publication is Post => publication.__typename === 'Post');
  
      let filteredPublications = posts;

      if (filterExpensiveBuyNow) {
        filteredPublications = filteredPublications.filter((publication: Post) => {
          const sellType = getPostSellType(publication);
          if (sellType === 'auction') return true;
          const buyNowPrice = getBuyNowPrice(publication);
          return sellType === 'buy_now' && buyNowPrice && buyNowPrice >= 5000;
        });
      }

      const sortedPublications = filteredPublications.sort((a: Post, b: Post) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  
      setPublications(prevPublications => {
        const combinedPublications = [...prevPublications, ...sortedPublications];
        return combinedPublications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      });
      setHasMore(sortedPublications.length > 0);
    }
  }, [data, loading2, filterExpensiveBuyNow]);

  const filterPublicationsByCurated = useCallback(() => {
    let filteredPublicationIds = allPublicationIds;
    if (showCurated) {
      filteredPublicationIds = filteredPublicationIds.filter(id => {
        const profileId = id.split('-')[0];
        return VERIFIED_ARTIST_PROFILE_IDS.includes(profileId);
      });
    }
    setPublicationIds(filteredPublicationIds);
    setIndex(0); // Reset pagination index
    setPublications([]); // Reset publications when filter changes
  }, [showCurated, allPublicationIds]);

  useEffect(() => {
    filterPublicationsByCurated();
  }, [showCurated, filterPublicationsByCurated]);

  const fetchMoreData = useCallback(() => {
    if (next && hasMore) {
      setIndex(prevIndex => prevIndex + 1);
      next();
    }
  }, [next, hasMore]);

  const handleToggleChange = (value: boolean) => {
    setShowCurated(value);
  };

  const handleBuyNowFilterChange = (value: boolean) => {
    setFilterExpensiveBuyNow(value);  // Handle the new filter toggle
    setIndex(0);  // Reset the pagination index
    setPublications([]);  // Reset the loaded publications
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center m-4">
      <main className="w-full sm:w-auto mt-20"> 
        <h1 className="text-4xl font-bold text-center py-2">Welcome to Mystic Garden</h1>
        <div className="text-xl text-center py-1 mx-auto sm:w-1/2 lg:w-1/3 text-gray-600 italic">
          Our sanctuary of art and magic is currently in the process of blooming... 🌿🌸
        </div>
        <div className="my-4 flex flex-col sm:flex-row justify-start items-start sm:items-center">
          <div className="mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto flex items-center">
            <Switch checked={showCurated} onCheckedChange={handleToggleChange} />
            <span className="ml-2">Verified Artists</span>
          </div>
          <div className="mb-4 sm:mb-0 sm:ml-4 w-full sm:w-auto flex items-center">
            <Switch checked={filterExpensiveBuyNow} onCheckedChange={handleBuyNowFilterChange} />
            <span className="ml-2">Buy Now ≥ 5,000 BONSAI</span>
          </div>
        </div>
        <InfiniteScroll
          dataLength={publications.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<ClipLoader color="#36d7b7" />}
        >
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {!loading && !error && publications.map(publication => (
                <GalleryPost key={publication.id} publication={publication} />
              ))}
            </div>
          </div>
        </InfiniteScroll>
        {error && <div>Error: {error.message}</div>}
      </main>
    </div>
  );
}