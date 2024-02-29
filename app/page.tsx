'use client'

import { useState, useEffect } from 'react';
import { useProfiles, useExploreProfiles, ExploreProfilesOrderByType, LimitType, profileId } from '@lens-protocol/react-web';
import { Button } from '@/components/ui/button'

import {
  Loader2,
  PersonStanding
} from "lucide-react"

export default function SearchPage() {

const [searchType, setSearchType] = useState('id');
const [searchValue, setSearchValue] = useState('5'); 


const { data: profiles, loading: loadingProfiles } = useProfiles({
  where: {
    profileIds: searchType === 'id' ? [profileId('0x0' + parseInt(searchValue).toString(16))] : [],
  },
});

const { data: profileByHandle, loading: loadingProfileByHandle } = useProfiles({
  where: {
    handles: searchType === 'handle' ? [searchValue] : [],
  },
});

const loading = loadingProfiles || loadingProfileByHandle;

const profile = profiles?.[0] || profileByHandle?.[0]; 


return (
  <main className="
    px-6 py-14
    sm:px-10
  ">
      <h1 className="text-5xl font-bold mt-3">
        Profile Searcher
      </h1>        
      <p className="mt-4 max-w-[750px] text-lg text-muted-foreground sm:text-xl">
        Lens Profile and Handle searcher.
      </p>

      <div className="mt-[70px] flex ml-2">
      <Button variant="ghost" onClick={() => setSearchType('id')} className={searchType !== 'id' ? 'opacity-60' : ''}>Search by ID</Button>
      <Button variant="ghost" onClick={() => setSearchType('handle')} className={searchType !== 'handle' ? 'opacity-60' : ''}>Search by Handle</Button>
      </div>

    <div className="mt-4">
      <input type="text" onChange={e => setSearchValue(e.target.value)} placeholder={`Filter by ${searchType}`} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>

    {
        <div className='md:flex min-h-[300px] mt-3'>
          <div className="sm:border-t sm:border-r sm:border-b rounded-tr rounded-br flex flex-1 pb-4">
            {
                <div className="flex flex-1 flex-wrap p-4">
                  {
                    loading && (
                      <div className="
                        flex flex-1 justify-center items-center
                      ">
                        <Loader2 className="h-12 w-12 animate-spin" />
                      </div>
                    )
                  }
                  {
                    profile && (
                      <div key={profile.id} className="lg:w-1/4 sm:w-1/2 p-4">
                        {profile.handle ? (
                          <>
                            <a
                              rel="no-opener"
                              target="_blank"
                              href={`https://hey.xyz/u/${profile.handle.localName}`}
                            >
                              <div className="overflow-hidden rounded-md">
                                <div className="aspect-square">
                                  <img
                                    className="h-auto w-auto object-cover transition-all hover:scale-105"
                                    src={profile.metadata?.picture?.optimized?.uri}
                                  />
                                </div>
                              </div>
                            </a>
                            <div className="space-y-1 text-sm mt-2">
                              <h3 className="font-medium leading-none text-lg">Name: {profile.metadata?.displayName}</h3>
                              <p className="font-medium leading-none">Handle: @{profile.handle.localName}</p>
                              <p className="font-medium leading-none">Profile Hex Id:  { profile.id }</p>
                              <p className="font-medium leading-none">Profile Id:  #{parseInt(profile.id).toString()}</p>
                              <div className="flex space-x-2">
                                <img
                                  src="https://opensea.io/static/images/logos/opensea-logo.svg"
                                  alt="OpenSea Logo"
                                  className="h-6 w-6"
                                />
                                <a
                                  href={`https://opensea.io/assets/matic/0xdb46d1dc155634fbc732f92e853b10b288ad5a1d/${parseInt(profile.id).toString()}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium leading-none text-blue-500 hover:underline"
                                >
                                  Profile NFT
                                </a>
                              </div>
                              <div className="flex space-x-2">
                                <img
                                  src="https://opensea.io/static/images/logos/opensea-logo.svg"
                                  alt="OpenSea Logo"
                                  className="h-6 w-6"
                                />
                                <a
                                  href={`https://opensea.io/assets/matic/0xe7e7ead361f3aacd73a61a9bd6c10ca17f38e945/${BigInt(`${profile.handle.id}`).toString()}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium leading-none text-blue-500 hover:underline"
                                >
                                  Handle NFT
                                </a>
                              </div>
                            </div>
                          </>
                        ) : (
                          <p>This profile doesn't have a linked handle.</p>
                        )}
                      </div>
                    )
                  }
                </div>
            }      
          </div>
        </div>
    }
  </main>
)
}