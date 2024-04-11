'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePublications, PublicationId, PublicationType, LimitType, Post } from '@lens-protocol/react-web';
import GalleryPost from '@/components/galleryPost'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function GalleryPage() {
  const [publicationIds, setPublicationIds] = useState<PublicationId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  type Tag = { value: string; label: string; } | null;
  
  useEffect(() => {
    fetch('https://lensboard-data.onrender.com/api/get1editionsBonsai')
      .then(response => response.json())
      .then(data => {
        console.log('data:', data);
        const result = JSON.parse(data.result);
        console.log('result:', result);
        const publicationsList = result.publicationsList as PublicationId[];
        console.log('publicationsList:', publicationsList);
        setPublicationIds(publicationsList);
        console.log('publicationsIds:', publicationIds);
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

  // State to hold the selected tag
  const [selectedTag, setSelectedTag] = useState<Tag>(null);

  //const testPublicationId: PublicationId[] = ['0x011e55-0x0702', '0x011e55-0x060e', '0x011e55-0x0628', '0x011e55-0x0642', '0x011e55-0x06fc', '0x011e55-0x0646', '0x0182d8-0x0150', '0x01837b-0x80', '0x018924-0x171c', '0x2d0e-0x04c7', '0x0159-0x03fe', '0x01ed11-0x5c', '0x01ee54-0x0210', '0x01ee54-0x0391', '0x01ee54-0x0332', '0x01ee54-0x028b', '0x01ee54-0x03d5', '0x01ee54-0x0274', '0x01ead2-0x0260', '0x011e55-0x060e', '0x011e55-0x0628', '0x011e55-0x0642', '0x011e55-0x06fc', '0x011e55-0x0646', '0x0182d8-0x0150', '0x01837b-0x80', '0x018924-0x171c', '0x2d0e-0x04c7', '0x0159-0x03fe', '0x01ed11-0x5c', '0x01ee54-0x0210', '0x01ee54-0x0391', '0x01ee54-0x0332', '0x01ee54-0x028b', '0x01ee54-0x03d5', '0x01ee54-0x0274', '0x01ead2-0x0260', '0x011e55-0x060e', '0x011e55-0x0628', '0x011e55-0x0642']
  const currentPagePublicationIds = publicationIds.slice(1, 40);
  
  const { data: publications, error: errorPublications } = usePublications({
    where: {
      publicationIds: currentPagePublicationIds
    },
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter the posts based on the selected tag
  const filteredPosts = useMemo(() => {
    return selectedTag 
      ? (publications as Post[])?.filter(publication => publication.metadata.__typename.replace('MetadataV3', '') === selectedTag.value) 
      : (publications as Post[]);
  }, [selectedTag, publications]);

  //scroll logic
  const [isFetching, setIsFetching] = useState(false);
  const fetchMorePosts = async () => {
    setIsFetching(true);
    
    // Fetch more posts here and append them to your current posts
    
    setIsFetching(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      fetchMorePosts();
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

// Pagination logic
const indexOfLastPost = currentPage * itemsPerPage;
const indexOfFirstPost = indexOfLastPost - itemsPerPage;
const currentPosts = (filteredPosts as Post[])?.slice(indexOfFirstPost, indexOfLastPost);

const paginate = pageNumber => setCurrentPage(pageNumber);

const handleTagChange = (tagValue: string) => {
  const tag = tags.find(tag => tag.value === tagValue);
  if (tag) {
    setSelectedTag(tag);
  } else {
    setSelectedTag(null);
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
        {loading && <button>Loading...</button>}
        {error && <div>Error: {error.message}</div>}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
            {!loading && !error && currentPosts?.map(publication => (
              <GalleryPost key={publication.id} publication={publication} />
            ))}
          </div>
        </div>
        {!loading && !error && publications && (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="#" onClick={() => { if (currentPage > 1) { paginate(currentPage - 1); window.scrollTo(0, 0); } }} />
      </PaginationItem>
      {[...Array(Math.ceil(publications.length / itemsPerPage))].map((e, i) => (
        <PaginationItem key={i}>
          <PaginationLink 
            href="#" 
            onClick={() => { paginate(i + 1); window.scrollTo(0, 0); }}
            isActive={currentPage === i + 1}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      {currentPage < Math.ceil(publications.length / itemsPerPage) && <PaginationEllipsis />}
      <PaginationItem>
        <PaginationNext href="#" onClick={() => { if (currentPage < Math.ceil(publications.length / itemsPerPage)) { paginate(currentPage + 1); window.scrollTo(0, 0); } }} />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
)}
    </main>
    </div>
  );
}