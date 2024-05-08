'use client'

import { Button } from '@/components/ui/button';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ModeToggle } from '@/components/dropdown';
import { ChevronRight, Droplets, LogOut } from "lucide-react";
import { useCallback, useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ProfileId, useLogin, useLogout, useProfilesManaged, useProfiles } from '@lens-protocol/react-web';
import { useLoginState } from '@/app/loginStateProvider';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { debounce } from 'lodash'; // Import lodash debounce function
import SearchProfiles from './searchProfiles';

export function Nav() {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const pathname = usePathname();
  const { execute: exLogin } = useLogin();
  const { execute: exLogout } = useLogout();
  const { data: managedProfiles, loading: loadingProfiles } = useProfilesManaged({ for: address ?? '' });
  const { isLoggedIn, setIsLoggedIn, profileId, setProfileId } = useLoginState();
  const [openSearch, setOpenSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const login = useCallback((profileId: ProfileId) => {
    if (!address) {
      alert('Address is not defined');
      return;
    }
    exLogin({
      address: address,
      profileId: profileId,
    }).then(() => {
      setIsLoggedIn(true);
      setProfileId(profileId); // Set only the profileId
    }).catch(error => {
      console.error('Login failed:', error);
    });
  }, [address, exLogin, setIsLoggedIn, setProfileId]);

  const logout = useCallback(() => {
    exLogout().then(() => {
      setIsLoggedIn(false);
      setProfileId(null); // Clear the profileId
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  }, [exLogout, setIsLoggedIn, setProfileId]);

  const { data: profiles, loading: searchLoading, error: searchError } = useProfiles({
    where: {
      handles: searchInput ? [`lens/${searchInput}`] : [],
    },
  });

  const search = useCallback(() => {
    setOpenSearch((open) => !open)
},[]);

  const debouncedSearch = useCallback(debounce(setSearchInput, 300), []);

  const handleSearchInput = (event) => {
    debouncedSearch(event.target.value);
  };

  const toggleSearch = useCallback(() => {
    setOpenSearch((open) => !open);
  }, []);

  return (
    <nav className='border-b flex flex-row items-start sm:items-center sm:pr-10 px-4 sm:px-0'>
      { /* Mobile Menu: Drawer*/ } 
      <div className='py-3 px-8 flex flex-1 items-center p sm:hidden'>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DrawerTrigger>
          <DrawerContent className='px-2'>
            <Link href="/" className={`block py-2 text-sm ${pathname !== '/' && 'opacity-50'}`}>
              Home
            </Link>
           {/*  <Link href="/gallery" className={`block py-2 text-sm ${pathname !== '/gallery' && 'opacity-50'}`}>
              Gallery
            </Link>*/ }
            {address && (
              <Link href="/profile" className={`block py-2 text-sm ${pathname !== '/profile' && 'opacity-60'}`}>
                Profile
              </Link>
            )}
          </DrawerContent>
        </Drawer>
      </div>    
    { /* Desktop Menu - Nav bar */ } 
      <div className='py-3 px-8 flex flex-1 items-center p hidden sm:flex sm:items-center'>
        <Link href="/" className='mr-5 flex items-center'>
          <Droplets className="opacity-85" size={19} />
          <p className={`ml-2 mr-4 text-lg font-semibold`}>Mystic Garden</p>
        </Link>
        <Link href="/" className={`mr-5 text-sm ${pathname !== '/' && 'opacity-50'}`}>
          <p>Home</p>
        </Link>
        {/*  <Link href="/gallery" className={`mr-5 text-sm ${pathname !== '/gallery' && 'opacity-50'}`}>
          <p>Gallery</p>
        </Link> */ }
        {
          address && (
            <Link href="/profile" className={`mr-5 text-sm ${pathname !== '/profile' && 'opacity-60'}`}>
              <p>Profile</p>
            </Link>
          )
        }
      <SearchProfiles />
      </div>
      <div className='flex sm:items-center pl-8 py-3 sm:p-0'>
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
<Button onClick={() => disconnect()} variant="secondary" className="ml-8 mr-4">
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