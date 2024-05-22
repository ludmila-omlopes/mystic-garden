'use client'

import { useState } from 'react';
import { useProfiles, useSession, useOwnedHandles, useUnlinkHandle, SessionType, useLinkHandle, useLogin, useLogout, useProfilesManaged, ProfileId } from '@lens-protocol/react-web';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { useAccount } from 'wagmi'

export default function ProfilePage() {
  const { address } = useAccount()
  const { data: handlesData } = useOwnedHandles({ for: address ?? ''});
  const { execute: exLogin, data: loginData } = useLogin();
  const { execute: exLogout, loading: loadingLogout  } = useLogout();
  const { data: managedProfiles, loading: loadingProfiles } = useProfilesManaged({ for: address ?? '' });
  const { execute: exUnlink, error: errorUnlink, loading: loadingUnlink } = useUnlinkHandle();
  const { execute: exLink, error: errorLink, loading: loadingLink } = useLinkHandle();
  const { data: sessionData, error: sessionError, loading: sessionLoading } = useSession();
  
  const login = (profileId: ProfileId) => {
    exLogin({
      address: address ?? '',
      profileId: profileId,
    });
  };

  const logout = () => {
    exLogout();
    window.location.reload();
  };

  const link = async (handle) => {
    const result = await exLink({
      handle,
      sponsored: false
    }); };

  const unlink = async (handle) => {
    const result = await exUnlink({
      handle,
      sponsored: false
    });

    if (result.isFailure()) {
      switch (result.error.name) {
        case 'BroadcastingError':
          console.log('There was an error broadcasting the transaction', result.error.message);
          break;
        case 'PendingSigningRequestError':
          console.log(
            'There is a pending signing request in your wallet. ' +
              'Approve it or discard it and try again.'
          );
          break;
        case 'WalletConnectionError':
          console.log('There was an error connecting to your wallet', result.error.message);
          break;
        case 'InsufficientGasError':
          console.log('You do not have enough funds to pay for the transaction gas cost.', result.error.message);
          break;
        case 'UserRejectedError':
          // the user decided to not sign, usually this is silently ignored by UIs
          break;
      }
      return;
    }
  
    const completion = await result.value.waitForCompletion();
  
    if (completion.isFailure()) {
      console.log('There was an error processing the transaction', completion.error.message);
      return;
    }
  
    // the transaction is fully processed
  };

  switch (sessionData?.type) {
    case SessionType.Anonymous:
      // data is a AnonymousSession
      return (
        <main className="p-6">
          <Avatar className="mr-4 w-24 h-24">
            <AvatarImage src="/path/to/your/fallback/image.png" />
          </Avatar>
          <p>Anonymous Session</p>
        </main>
      );
    case SessionType.JustWallet:
      // data is a WalletOnlySession
      return (
      <main className="p-6">
          <Avatar className="mr-4 w-24 h-24">
            <AvatarImage src="/path/to/your/fallback/image.png" />
          </Avatar>
          <p>Wallet-Only Session</p>
        </main>  
      );
    case SessionType.WithProfile:
      // data is a ProfileSession
      return (
        <main className="p-6">
          {sessionData.profile?.metadata?.picture?.__typename === 'ImageSet' && (
            <Avatar className="mr-4 w-24 h-24">
              <AvatarImage src={sessionData.profile.metadata.picture.optimized?.uri} />
            </Avatar>
          )}
          <h1 className="text-5xl font-bold mt-3">Your Profile</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">Coming Soon...</p>
        </main>
      );
  
    default:
      return <p>Something went wrong.</p>;
  }
    }