'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePublications, PublicationId, PublicationType, LimitType, Post, AnyPublication, PublicationMetadataMainFocusType } from '@lens-protocol/react-web';
import InfiniteScroll from "react-infinite-scroll-component";
import GalleryPost from '@/components/galleryPost'

  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function GalleryPage() {
  const ITEMS_PER_PAGE = 10;
  const ITEMS_PER_API_CALL = 40;
  const [publicationIds, setPublicationIds] = useState<PublicationId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [index, setIndex] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [publications, setPublications] = useState<AnyPublication[]>([]);
  const [selectedTag, setSelectedTag] = useState('all');
  type Tag = { value: string; label: string; } | null;
  
  useEffect(() => {
    fetch('https://lensboard-data.onrender.com/api/get1editionsBonsai')
      .then(response => response.json())
      .then(data => {
        const result = JSON.parse(data.result);
        const publicationsList = result.publicationsList as PublicationId[];
        setPublicationIds(publicationsList);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const tags = [
    { value: 'Audio', label: 'Audio' },
    { value: 'Image', label: 'Image' },
    { value: 'Text', label: 'Text' },
    // Add more tags as needed
  ];

  // Filter Logic
  /*const filteredPosts = useMemo(() => {
    return selectedTag 
      ? (publications as Post[])?.filter(publication => publication.metadata.__typename.replace('MetadataV3', '') === selectedTag.value) 
      : (publications as Post[]);
  }, [selectedTag, publications]);*/

  const handleTagChange = (value) => {
    setSelectedTag(value);
  };

  useEffect(() => {
    setPublications([]);
    setIndex(0);
  }, [selectedTag]);


  //const testPublicationId: PublicationId[] = ['0x011e55-0x0702', '0x011e55-0x060e', '0x011e55-0x0628', '0x011e55-0x0642', '0x011e55-0x06fc', '0x011e55-0x0646', '0x0182d8-0x0150', '0x01837b-0x80', '0x018924-0x171c', '0x2d0e-0x04c7', '0x0159-0x03fe', '0x01ed11-0x5c', '0x01ee54-0x0210', '0x01ee54-0x0391', '0x01ee54-0x0332', '0x01ee54-0x028b', '0x01ee54-0x03d5', '0x01ee54-0x0274', '0x01ead2-0x0260', '0x011e55-0x060e', '0x011e55-0x0628', '0x011e55-0x0642', '0x011e55-0x06fc', '0x011e55-0x0646', '0x0182d8-0x0150', '0x01837b-0x80', '0x018924-0x171c', '0x2d0e-0x04c7', '0x0159-0x03fe', '0x01ed11-0x5c', '0x01ee54-0x0210', '0x01ee54-0x0391', '0x01ee54-0x0332', '0x01ee54-0x028b', '0x01ee54-0x03d5', '0x01ee54-0x0274', '0x01ead2-0x0260', '0x011e55-0x060e', '0x011e55-0x0628', '0x011e55-0x0642']

  //Fetching logic

  const { data, loading: loading2, error: error2, next } = usePublications({
    where: {
      publicationIds: publicationIds.slice(index * ITEMS_PER_PAGE, (index + 1) * ITEMS_PER_PAGE),
    },
  });

  useEffect(() => {
    if (!loading2) {
      if (error2) {
        console.log(error2);
      } else {
        const filteredData = selectedTag !== 'all' 
        ? data.filter((publication: any) => (publication as Post).metadata?.__typename.replace('MetadataV3', '').includes(selectedTag))
        : data;
        setPublications((prevPublications) => [...prevPublications, ...filteredData]);
        setHasMore(filteredData.length > 0);
        setIndex((prevIndex) => prevIndex + 1);
      }
    }
  }, [loading2, error2, data]);

  const fetchMoreData = () => {
    if (next && publications.length - index * ITEMS_PER_PAGE < ITEMS_PER_API_CALL) {
      next();
    }
  };

  return (
    <div className="flex justify-center">
        <main>
        <h1 className="text-4xl font-bold text-center py-2">Bonsai Gallery</h1>
        <div className="text-xl text-center py-1">Featuring 1/1 art from Lens artists</div>
        
        <div className="my-4">
        <Select onValueChange={handleTagChange}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Filter by tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
            <SelectItem value="all">All</SelectItem>
              {tags.map(tag => (
                <SelectItem 
                  value={tag.value} 
                  key={tag.value}
                >
                  {tag.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>

        <InfiniteScroll
        dataLength={publicationIds.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<button>Loading...</button>}
        >
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
            {!loading && !error && publications?.map(publication => (
              <GalleryPost key={publication.id} publication={publication} />
            ))}
          </div>
        </div>
        </InfiniteScroll>

    </main>
    </div>
  );
}