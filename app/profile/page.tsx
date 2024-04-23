'use client'

import { useState } from 'react';
import { useProfiles, useOwnedHandles, useUnlinkHandle, useLinkHandle, useLogin, useLogout, useProfilesManaged, ProfileId } from '@lens-protocol/react-web';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { useAccount } from 'wagmi'

export default function ProfilePage() {
  const { address } = useAccount()
  const { data: profiles } = useProfiles({ where: { profileIds: [/* user's profile ID here */] } });
  const { data: handlesData } = useOwnedHandles({ for: address ?? ''});
  const [selectedHandle, setSelectedHandle] = useState('');
  const { execute: exLogin, data: loginData } = useLogin();
  const { execute: exLogout, loading: loadingLogout  } = useLogout();
  const { data: managedProfiles, loading: loadingProfiles } = useProfilesManaged({ for: address ?? '' });
  const [isLoggedIn, setIsLoggedIn] = useState(!!loginData);
  const { execute: exUnlink, error: errorUnlink, loading: loadingUnlink } = useUnlinkHandle();
  const { execute: exLink, error: errorLink, loading: loadingLink } = useLinkHandle();

  const login = (profileId: ProfileId) => {
    exLogin({
      address: address ?? '',
      profileId: profileId,
    }).then(() => setIsLoggedIn(true));
  };

  const logout = () => {
    exLogout().then(() => setIsLoggedIn(false));
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

  return (
    <main className="p-6">
       {loginData?.metadata?.picture?.__typename === 'ImageSet' && (
      <Avatar className="mr-4 w-24 h-24">
        <AvatarImage src={loginData.metadata.picture.optimized?.uri} />
      </Avatar>
    )}
      <h1 className="text-5xl font-bold mt-3">Lens Profile</h1>
      {isLoggedIn ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button>Login</Button>
          </DialogTrigger>
          <DialogContent>
            {loadingProfiles ? (
              <div>Loading profiles...</div>
            ) : (
              managedProfiles?.map(profile => (
                <Card
                  key={profile.id}
                  onClick={() => login(profile.id)}
                  className="w-full text-left cursor-pointer hover:bg-gray-600"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={
                          profile.metadata?.picture?.__typename === 'ImageSet'
                            ? profile.metadata?.picture?.optimized?.uri
                            : undefined
                        }
                        alt={profile.handle?.localName}
                      />
                      <AvatarFallback>{profile.handle?.localName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-bold">{profile.handle?.localName}</h2>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </DialogContent>
        </Dialog>
      )}
      {loginData && (
        <>
          <h2 className="text-3xl font-bold mt-6">Owned Handles</h2>
          <section className="mt-4">
            <h2 className="text-2xl font-bold">Your Handles</h2>
            <div className="mt-2">
              {handlesData?.map(handle => (
                <Card key={handle.id} className={`mt-2 p-2 ${handle.fullHandle === loginData.handle?.fullHandle ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>
                  <p>{handle.fullHandle}</p>
                  {handle.fullHandle === loginData.handle?.fullHandle && (
                    <Button onClick={() => unlink(handle)}>Unlink</Button>
                  )}
                  {handle.fullHandle !== loginData.handle?.fullHandle && (
                    <Button onClick={() => link(handle)}>Link</Button>
                  )}
                </Card>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
    }