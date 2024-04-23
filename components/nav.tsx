'use client'

import { Button } from '@/components/ui/button'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ModeToggle } from '@/components/dropdown'
import { ChevronRight, Droplets, LogOut } from "lucide-react"
import { useEffect, useState, useCallback } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ProfileId, useLogin, useLogout, useProfilesManaged } from '@lens-protocol/react-web';
import { useLoginState } from '@/app/loginStateProvider';

export function Nav() {
  const { open } = useWeb3Modal()
  const { address } = useAccount()
  const pathname = usePathname()
  const { execute: exLogin, data: loginData } = useLogin();
  const { execute: exLogout, loading: loadingLogout  } = useLogout();
  const { data: managedProfiles, loading: loadingProfiles } = useProfilesManaged({ for: address ?? '' });
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useLoginState(); // Use the hook to get the login state and functions

  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!loginData);
  }, [loginData]);

  const login = useCallback((profileId: ProfileId) => {
    if (!address) {
      alert('Address is not defined');
      return;
    }
    exLogin({
      address: address,
      profileId: profileId,
    }).then((userData) => {
      setIsLoggedIn(true);
      setUserData(userData); // Set the user data after login
    });
  }, [address, exLogin, setUserData]);

  //todo: limpar o userdata
  const logout = useCallback(() => {
    exLogout().then(() => setIsLoggedIn(false));
    window.location.reload();
  }, [exLogout]);

  return (
    <nav className='
    border-b flex
    flex-col sm:flex-row
    items-start sm:items-center
    sm:pr-10
    '>
      <div
        className='py-3 px-8 flex flex-1 items-center p'
      >
        <Link href="/" className='mr-5 flex items-center'>
          <Droplets className="opacity-85" size={19} />
          <p className={`ml-2 mr-4 text-lg font-semibold`}>Lens Dashboard</p>
        </Link>

        <Link href="/" className={`mr-5 text-sm ${pathname !== '/' && 'opacity-50'}`}>
          <p>Home</p>
        </Link>
        <Link href="/gallery" className={`mr-5 text-sm ${pathname !== '/gallery' && 'opacity-50'}`}>
          <p>Bonsai Gallery</p>
        </Link>

        {
          address && (
            <Link href="/profile" className={`mr-5 text-sm ${pathname !== '/profile' && 'opacity-60'}`}>
              <p>Profile</p>
            </Link>
          )
        }
      </div>
      <div className='
        flex
        sm:items-center
        pl-8 pb-3 sm:p-0
      '>
        {
    address && (
      <>
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
<Button onClick={disconnect} variant="secondary" className="ml-8 mr-4">
  Disconnect
  <LogOut className="h-4 w-4 ml-3" />
</Button>
      </>
    )
  }
  {
    !address && (
      <Button onClick={() => open()} variant="secondary" className="mr-4">
        Connect Wallet
        <ChevronRight className="h-4 w-4" />
      </Button>
    )
  }
        <ModeToggle />
      </div>
    </nav>
  )
}