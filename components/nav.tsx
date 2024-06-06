'use client';

import { Button } from '@/components/ui/button';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ModeToggle } from '@/components/dropdown';
import { ChevronRight, LogOut } from "lucide-react";
import { useCallback, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ProfileId, useLogin, useLogout, useProfilesManaged, useSession } from '@lens-protocol/react-web';
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import SearchProfiles from './searchProfiles';
import MysticIcon from './mysticIcon';
import { Input } from "@/components/ui/input"

export function Nav() {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const pathname = usePathname();
  const { execute: exLogin, data: loginData } = useLogin();
  const { execute: exLogout } = useLogout();
  const { data: managedProfiles, loading: loadingProfiles } = useProfilesManaged({ for: address ?? '' });
  const { data: sessionData, error: sessionError, loading: sessionLoading } = useSession();
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
    }).catch(error => {
      console.error('Login failed:', error);
    });
  }, [address, exLogin]);

  const logout = useCallback(() => {
    exLogout().then(() => {
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  }, [exLogout]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 shadow-md bg-white/80 dark:bg-neutral-950/70">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="flex items-center" prefetch={false}>
              <MysticIcon className="h-8 w-8" />
              <p className={`ml-2 mr-4 text-lg font-semibold`}>Mystic Garden</p>
            </Link>
            <ul className="hidden md:flex items-center gap-6">
              <li>
                <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300" prefetch={false}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-gray-700 dark:hover:text-gray-300" prefetch={false}>
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/gallery/mint" className="hover:text-gray-700 dark:hover:text-gray-300" prefetch={false}>
                  Create New
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full">
                <div className="flex flex-col gap-4 p-4">
                  <SearchProfiles />
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300" prefetch={false}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/explore" className="hover:text-gray-700 dark:hover:text-gray-300" prefetch={false}>
                        Explore
                      </Link>
                    </li>
                    <li>
                      <Link href="/gallery/mint" className="hover:text-gray-700 dark:hover:text-gray-300" prefetch={false}>
                        Create New
                      </Link>
                    </li>
                  </ul>
                  {address ? (
                    <Button onClick={logout}>Logout</Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
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
                  <w3m-button />
                  <ModeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0 hidden md:flex">
          <SearchProfiles />
          {address && (
            <>
              {sessionData?.authenticated ? (
                <Button onClick={logout}>Logout</Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
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
            </>
          )}
          <w3m-button />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
