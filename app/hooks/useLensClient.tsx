import { useMemo } from 'react';
import { useStorage } from '@lens-protocol/react-web';
import { LensClient, production, development } from '@lens-protocol/client';

export const useLensClient = () => {
  const storage = useStorage();

  const client = useMemo(() => {
    return new LensClient({
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? production : development,
      storage,
    });
  }, [storage]);

  return client;
};
