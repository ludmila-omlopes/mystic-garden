import { useState, useEffect } from 'react';
import { useReadErc721OwnerOf } from '@/src/generated';
import { getSimpleOrMultirecipientFeeCollectOpenActionModule } from '@/lib/publications';
import { polygon, polygonAmoy } from 'wagmi/chains';
import { useLastLoggedInProfile, Profile, Post } from '@lens-protocol/react-web';

export const useBuyNowOwnerProfile = (post: Post) => {
  const requiredChainId = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? polygon.id : polygonAmoy.id;
  const [ownerProfile, setOwnerProfile] = useState<Profile | string | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const collectModule = getSimpleOrMultirecipientFeeCollectOpenActionModule(post);

  const { data: nftOwnerAddress, error: nftOwnerError } = useReadErc721OwnerOf({
    args: [BigInt(1)],
    address: collectModule?.collectNft ? collectModule.collectNft : '',
    chainId: requiredChainId,
  });

  const { data: profile, error: profileError } = useLastLoggedInProfile({ for: nftOwnerAddress || '' });

  useEffect(() => {
    if (!collectModule?.collectNft) {
      setError(new Error('No collect NFT found'));
      return;
    }
    if (nftOwnerError || profileError) {
      setError(nftOwnerError || profileError);
      return;
    }

    if (profile) {
      setOwnerProfile(profile);
    } else if (nftOwnerAddress) {
      setOwnerProfile(nftOwnerAddress);
    } else {
      setError(new Error('No owner address found'));
    }
  }, [ nftOwnerError, profileError, profile, nftOwnerAddress, collectModule?.collectNft]);

  return { ownerProfile, error };
};