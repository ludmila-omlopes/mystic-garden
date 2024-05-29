'use client';

import React, { useState, useEffect, useMemo, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { usePublications, PublicationId, Post, AnyPublication } from '@lens-protocol/react-web';
import GalleryPost from '@/components/galleryPost';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Explore() {
  const ITEMS_PER_PAGE = 20;
  const [publicationIds, setPublicationIds] = useState<PublicationId[]>([]);
  const [publications, setPublications] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(0);
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const whereCondition = useMemo(() => ({
    where: {
      publicationIds: publicationIds.slice(index * ITEMS_PER_PAGE, (index + 1) * ITEMS_PER_PAGE),
    },
  }), [publicationIds, index]);

  const { data, loading: loading2, error: error2, next } = usePublications(whereCondition);

  const tags = [
    { value: 'Audio', label: 'Audio' },
    { value: 'Image', label: 'Image' },
    { value: 'Text', label: 'Text' },
    { value: 'Video', label: 'Video' },
  ];

  const handleSortOrderChange = (value: string) => {
    if (value === 'asc' || value === 'desc') {
      setSortOrder(value);
    } else {
      console.error(`Unexpected sortOrder: ${value}`);
    }
  };

  const handleTagChange = (value) => {
    if (tags.some(tag => tag.value === value)) {
      console.log()
      setSelectedTag(value);
    }
  };

  const sortPosts = (posts: Post[], sortOrder: 'asc' | 'desc' | undefined) => {
    if (!sortOrder) return posts;
    return [...posts].sort((a, b) => {
      const getPrice = (post: Post) => {
        if (post && post.openActionModules) {
          for (let actionModule of post.openActionModules) {
            if ((actionModule.__typename === 'SimpleCollectOpenActionSettings' || actionModule.__typename === 'MultirecipientFeeCollectOpenActionSettings') && Number(actionModule.amount.value) > 0) {
              return Math.floor(Number(actionModule.amount.value));
            }
          }
        }
        return null;
      };
      const aPrice = getPrice(a);
      const bPrice = getPrice(b);
      if (aPrice === null) return 1;
      if (bPrice === null) return -1;
      return sortOrder === 'asc' ? aPrice - bPrice : bPrice - aPrice;
    });
  };

  useEffect(() => {
    axios
      .get('https://lensboard-data.onrender.com/api/get1editionsBonsai')
      .then(response => {
        const result = JSON.parse(response.data.result);
        const publicationsList = result.publicationsList as PublicationId[];
        setPublicationIds(publicationsList);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading2 && data) {
      const filteredData = selectedTag !== 'all' 
        ? data.filter((publication: any) => (publication as Post).metadata?.__typename.replace('MetadataV3', '').includes(selectedTag))
        : data;
      const posts = filteredData.filter((publication: AnyPublication): publication is Post => publication.__typename === 'Post');
      setPublications((prevPublications) => [...prevPublications, ...posts]);
      setHasMore(posts.length > 0);
    }
  }, [data, loading2, selectedTag]);

  const fetchMoreData = useCallback(() => {
    if (next && hasMore) {
      setIndex(prevIndex => prevIndex + 1);
      next();
    }
  }, [next]);

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center m-4">
      <main className="w-full sm:w-auto">
        <h1 className="text-4xl font-bold text-center py-2">Welcome to Mystic Garden</h1>
        <div className="text-xl text-center py-1 mx-auto sm:w-1/2 lg:w-1/3 text-gray-600 italic">
          Our sanctuary of art and magic is currently in the process of blooming. Please bear with us as we cultivate the perfect experience for you. 🌿🌸
        </div>
        <div className="my-4 flex flex-col sm:flex-row justify-start items-start sm:items-center">
          <div className="mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto">
            <Select onValueChange={handleTagChange}>
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  {tags.map(tag => (
                    <SelectItem value={tag.value} key={tag.value}>
                      {tag.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto">
            <Select value={sortOrder} onValueChange={handleSortOrderChange}>
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="Order by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Price: Low to High</SelectItem>
                <SelectItem value="desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
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
              {!loading && !error && sortPosts(publications, sortOrder)?.map(publication => (
                <GalleryPost key={publication.id} publication={publication} />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </main>
    </div>
  );
}
