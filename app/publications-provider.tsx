'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { getApiEndpoint } from '@/lib/apiEndpoints';

interface PublicationsContextType {
  publicationIds: string[];
  loading: boolean;
  error: Error | null;
}

const PublicationsContext = createContext<PublicationsContextType | undefined>(undefined);

export const PublicationsProvider = ({ children }: { children: ReactNode }) => {
  const [publicationIds, setPublicationIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPublicationIds = async () => {
      try {
        const url = getApiEndpoint('get1editionsBonsai');
        const response = await axios.get(url);
        const result = JSON.parse(response.data.result);
        setPublicationIds(result.publicationsList);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
        else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPublicationIds();
  }, []);

  return (
    <PublicationsContext.Provider value={{ publicationIds, loading, error }}>
      {children}
    </PublicationsContext.Provider>
  );
};

export const use1on1PublicationIds = () => {
  const context = useContext(PublicationsContext);
  if (context === undefined) {
    throw new Error('use1on1PublicationIds must be used within a PublicationsProvider');
  }
  return context;
};
