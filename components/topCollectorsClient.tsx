'use client'

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLazyProfiles } from '@lens-protocol/react-web';
import { ProfileId } from '@lens-protocol/metadata';
import { cn, getProfileAvatarImageUri, getProfileName } from '@/lib/utils';
import Link from 'next/link';

type Collector = {
  name: string;
  id: string;
  totalValue: number;
  collectedCount: number;
  avatarUrl?: string;
  handle?: string;
};

export default function TopCollectors({ collectorsList }: { collectorsList: Collector[] }) {
  const [collectors, setCollectors] = useState<Collector[]>(collectorsList);
  const [profilesFetched, setProfilesFetched] = useState(false);
  const [fetching, setFetching] = useState(false); // Add fetching state
  const { execute: fetchProfiles, data: profiles, loading, error } = useLazyProfiles();

  useEffect(() => {
    const fetchProfilesData = async () => {
      if (collectors.length && !profilesFetched && !fetching) {
        try {
          setFetching(true); // Prevent multiple calls
          const profileIds = collectors.map(collector => collector.id) as ProfileId[];
          const result = await fetchProfiles({ where: { profileIds } });

          if (result.isFailure()) {
            console.error(result.error.message);
          } else {
            const updatedCollectors = collectors.map(collector => {
              const profile = result.value.find(p => p.id === collector.id);
              return profile
                ? { ...collector, name: getProfileName(profile), avatarUrl: getProfileAvatarImageUri(profile), handle: profile.handle?.localName }
                : collector;
            });
            setCollectors(updatedCollectors);
            setProfilesFetched(true);
          }
        } catch (error) {
          console.error('Error fetching profiles:', error);
        } finally {
          setFetching(false); // Reset fetching state
        }
      }
    };

    fetchProfilesData();
  }, [collectors, profilesFetched, fetching, fetchProfiles]);

  return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {loading ? (
            <div>Loading profiles...</div>
          ) : (
            collectors.map((collector, index) => (
              <Card key={collector.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 z-10">
                <Link href={`/${collector.handle}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{collector.name || 'Unknown'}</span>
                    <Badge variant="secondary">#{index + 1}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={collector.avatarUrl || '/placeholder.svg'} alt={collector.name || 'Unknown'} />
                      <AvatarFallback>{collector.name?.slice(0, 2).toUpperCase() || 'UN'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="font-bold">{collector.totalValue.toLocaleString()} BONSAI</p>
                    </div>
                  </div>
                </CardContent>
                </Link>
              </Card>
            ))
          )}
        </div>
        {error && <div>Error fetching profiles: {error.message}</div>}
      </div>
  );
}
