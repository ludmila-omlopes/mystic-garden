import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuctionWithPublicationId } from '../types/auction';

const useAuctions = (publicationId) => {
  const [auctions, setAuctions] = useState<AuctionWithPublicationId[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchAuctions = async () => {
      try {
        const response = await axios.get(`/api/getAuctionsByIds?publicationIds=${publicationId}`);
        if (isMounted) { 
          setAuctions(response.data.data);
        }
      } catch (err) {
        if (isMounted) { 
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        }
      } finally {
        if (isMounted) { 
          setLoading(false);
        }
      }
    };

    if (publicationId) {
      fetchAuctions();
    }

    return () => {
      isMounted = false; 
    };
  }, [publicationId]);

  return { auctions, loading, error };
};

export default useAuctions;
