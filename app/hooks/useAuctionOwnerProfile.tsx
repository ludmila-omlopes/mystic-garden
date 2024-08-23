import { useState, useEffect } from 'react';
import { useReadAuctionsOaGetCollectNft, useReadErc721OwnerOf } from '@/src/generated';
import { parseFromLensHex } from '@/lib/utils';
import { polygon, polygonAmoy } from 'wagmi/chains';
import { useLastLoggedInProfile, Profile } from '@lens-protocol/react-web';

export const useAuctionOwnerProfile = (publicationId: string) => {
  const requiredChainId = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? polygon.id : polygonAmoy.id;
  const intPublicationId = parseFromLensHex(publicationId);

  const [ownerProfile, setOwnerProfile] = useState<Profile | string | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const { data: auctionNFTAddress, error: auctionNFTAddressError } = useReadAuctionsOaGetCollectNft({
    args: [intPublicationId.profileId, intPublicationId.publicationId],
    chainId: requiredChainId,
  });

  const { data: nftOwnerAddress, error: nftOwnerError } = useReadErc721OwnerOf({
    args: [BigInt(1)],
    address: auctionNFTAddress,
    chainId: requiredChainId,
  });

  const { data: profile, error: profileError } = useLastLoggedInProfile({ for: nftOwnerAddress ? nftOwnerAddress : '' });

  useEffect(() => {
    if (auctionNFTAddressError || nftOwnerError || profileError) {
      setError(auctionNFTAddressError || nftOwnerError || profileError);
      setOwnerProfile(undefined);
      return;
    }

    if (profile) {
      setOwnerProfile(profile);
    } else if (nftOwnerAddress) {
      setOwnerProfile(nftOwnerAddress);
    } else {
      setError(new Error('No owner address found'));
    }
  }, [auctionNFTAddressError, nftOwnerError, profileError, profile, nftOwnerAddress]);

  return { ownerProfile, error };
};
