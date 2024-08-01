'use client';

import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProfileId, useLogin, useProfilesManaged } from '@lens-protocol/react-web';
import { Button } from './ui/button';
import Link from 'next/link';

interface ProfileSelectDialogProps {
  address: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileSelectDialog: React.FC<ProfileSelectDialogProps> = ({ address, open, onOpenChange }) => {
  const { execute: exLogin } = useLogin();
  const { data: managedProfiles, loading: loadingProfiles } = useProfilesManaged({ for: address });

  const login = (profileId: ProfileId) => {
    exLogin({
      address,
      profileId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        {loadingProfiles ? (
          <div>Loading profiles...</div>
        ) : (
          <>
            {managedProfiles?.length === 0 ? (
              <div className="flex flex-col items-center">
                <p>No profiles found.</p>
                <Link href="/profile/mint" passHref>
                  <DialogClose asChild>
                    <Button className="mt-4">Create New Profile</Button>
                  </DialogClose>
                </Link>
              </div>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSelectDialog;
