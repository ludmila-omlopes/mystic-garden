'use client'

import { useState, useEffect } from 'react';
import { useProfiles, profileId, Profile, HandleInfo } from '@lens-protocol/react-web';
import { Button } from '@/components/ui/button'
import { useOwnedHandles } from '@lens-protocol/react-web';
import { Loader2, PersonStanding } from "lucide-react"
import ProfileCard from '@/components/ProfileCard';
import OwnedHandlesList from '@/components/OwnedHandlesList';

export default function SearchPage() {
  const [searchType, setSearchType] = useState('handle');
  const [searchValue, setSearchValue] = useState('lens/stani'); 
  const [profile, setProfile] = useState<Profile>();
  const [ownedHandles, setOwnedHandles] = useState<HandleInfo[]>([]);
  const { data: profiles, loading: loadingProfiles } = useProfiles({ where: { profileIds: searchType === 'id' ? [profileId('0x0' + parseInt(searchValue).toString(16))] : [], } });
  const { data: profileByHandle, loading: loadingProfileByHandle } = useProfiles({ where: { handles: searchType === 'handle' ? [searchValue] : [], } });
  const loading = loadingProfiles || loadingProfileByHandle;
  const { data: handlesData, loading: loadingHandles } = useOwnedHandles({ for: profile?.ownedBy?.address ?? '' });

  useEffect(() => {
    let newProfile = profiles?.[0] || profileByHandle?.[0];
    setProfile(newProfile);
  }, [profiles, profileByHandle]);

  useEffect(() => {
    if (handlesData) {
      setOwnedHandles(handlesData);
    }
  }, [handlesData]);

  return (
    <main className="px-6">
      <h1 className="text-3xl font-bold">Lens Profile Checker</h1>
      <p className="text-base text-gray-600">
        Find linked handle and profiles for Lens Protocol. Use the Profile ID as seen on OpenSea for ID searches, or the format &apos;lens/username&apos; for handle searches.
      </p>

      <div className="flex gap-2 mt-4">
        <Button variant={searchType === 'id' ? 'default' : 'ghost'} onClick={() => setSearchType('id')}>
          Search by ID
        </Button>
        <Button variant={searchType === 'handle' ? 'default' : 'ghost'} onClick={() => setSearchType('handle')}>
          Search by Handle
        </Button>
      </div>

      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={`Enter ${searchType}`}
        className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
      />

      {loading ? (
        <div className="flex justify-center mt-4">
          <Loader2 />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileCard profile={profile} />
          <OwnedHandlesList ownedHandles={ownedHandles} />
        </div>
      )}
    </main>
  )
}