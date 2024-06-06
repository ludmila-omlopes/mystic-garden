'use client';

import React, { useState, useEffect, useMemo, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { usePublications, PublicationId, Post, AnyPublication } from '@lens-protocol/react-web';
import GalleryPost from '@/components/galleryPost';
import { Switch } from "@/components/ui/switch";
import { getApiEndpoint } from "@/lib/apiEndpoints";
import { FEATURED_ARTIST_PROFILE_IDS } from '@/app/constants';

export default function Explore() {
  const ITEMS_PER_PAGE = 20;
  const [allPublicationIds, setAllPublicationIds] = useState<PublicationId[]>([]);
  const [publicationIds, setPublicationIds] = useState<PublicationId[]>([]);
  const [publications, setPublications] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showCurated, setShowCurated] = useState(true);

  useEffect(() => {
    setShowCurated(true);
    const url = getApiEndpoint('get1editionsBonsai');
    axios
      .get(url)
      .then(response => {
        const result = JSON.parse(response.data.result);
        const publicationsList = result.publicationsList as PublicationId[];
        setAllPublicationIds(publicationsList); // Store the full list
        setPublicationIds(publicationsList); // Initially set the full list to publicationIds
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
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
      setPublications((prevPublications) => [...prevPublications, ...posts]);
      setHasMore(posts.length > 0);
    }
  }, [data, loading2]);

  const filterPublicationsByCurated = useCallback(() => {
    let filteredPublicationIds = allPublicationIds;
    if (showCurated) {
      filteredPublicationIds = filteredPublicationIds.filter(id => {
        const profileId = id.split('-')[0];
        return FEATURED_ARTIST_PROFILE_IDS.includes(profileId);
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
      console.log('fetchMoreData');
      setIndex(prevIndex => prevIndex + 1);
      next();
    }
  }, [next, hasMore]);

  const handleToggleChange = (value: boolean) => {
    setShowCurated(value);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center m-4">
      <main className="w-full sm:w-auto">
        <h1 className="text-4xl font-bold text-center py-2">Welcome to Mystic Garden</h1>
        <div className="text-xl text-center py-1 mx-auto sm:w-1/2 lg:w-1/3 text-gray-600 italic">
          Our sanctuary of art and magic is currently in the process of blooming. Please bear with us as we cultivate the perfect experience for you. 🌿🌸
        </div>
        <div className="my-4 flex flex-col sm:flex-row justify-start items-start sm:items-center">
          <div className="mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto flex items-center">
            <Switch checked={showCurated} onCheckedChange={handleToggleChange} />
            <span className="ml-2">Curated Artists</span>
          </div>
        </div>
        <InfiniteScroll
          dataLength={publications.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div>Loading...</div>}
        >
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {!loading && !error && publications.map(publication => (
                <GalleryPost key={publication.id} publication={publication} />
              ))}
            </div>
          </div>
        </InfiniteScroll>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
      </main>
    </div>
  );
}
