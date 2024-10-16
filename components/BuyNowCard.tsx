import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { getPostMediaSource, getProfileAvatarImageUri, getTitle, isGenesisDropArtist } from '@/lib/utils';
import { FiPlayCircle } from 'react-icons/fi';
import ShineBorder from "@/components/magicui/shine-border";
import { Post, useLastLoggedInProfile } from '@lens-protocol/react-web';
import { getBuyNowPrice, getBuyNowStatus, getSimpleOrMultirecipientFeeCollectOpenActionModule } from '@/lib/publicationUtils';
import { polygon, polygonAmoy } from 'viem/chains';
import { useReadErc721OwnerOf } from '@/src/generated';
import { Skeleton } from './ui/skeleton';

export const BuyNowCard = ({ publication }) => {
  const imageSource = getPostMediaSource(publication);
  const price = getBuyNowPrice(publication);
  const formattedPrice = price ? `${price} BONSAI` : 'Not for sale';
  const handleName = publication.by?.handle?.localName || 'unknown';
  const isPlayable = publication.metadata.__typename === 'AudioMetadataV3' || publication.metadata.__typename === 'VideoMetadataV3';

  const requiredChainId = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? polygon.id : polygonAmoy.id;
  const collectModule = getSimpleOrMultirecipientFeeCollectOpenActionModule(publication);

  const { data: nftOwnerAddress, error: nftOwnerError, isLoading: isOwnerLoading } = useReadErc721OwnerOf({
    args: [BigInt(1)],
    address: collectModule?.collectNft ? collectModule.collectNft : '',
    chainId: requiredChainId,
  });

  const { data: ownerProfile, error: profileError, loading: isProfileLoading } = useLastLoggedInProfile({ for: nftOwnerAddress || "0x1234567890123456789012345678901234567890" });

  const buyNowStatus = publication.stats.countOpenActions === 0 ? 'available' : 'sold out';

  if (isOwnerLoading || isProfileLoading) {
    return (
      <div className="bg-background rounded-lg overflow-hidden shadow-lg mb-4 flex flex-col justify-between h-full">
        <div className="p-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-96 w-full mt-2" />
          <Skeleton className="h-6 w-40 mt-2" />
          <Skeleton className="h-6 w-16 mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-lg mb-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center mb-2 p-4">
          <Link href={"/" + publication.by?.handle?.localName} className='flex items-center'>
            {isGenesisDropArtist(publication.by?.id) ? (
              <ShineBorder
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                borderRadius={99}
                className="h-7 w-7 justify-center items-center"
                borderWidth={2.5}>
                <Avatar className="w-6 h-6">
                  <AvatarImage src={getProfileAvatarImageUri(publication.by)} />
                  <AvatarFallback>{handleName.charAt(0)}</AvatarFallback>
                </Avatar>
              </ShineBorder>
            ) : (
              <Avatar className="w-6 h-6">
                <AvatarImage src={getProfileAvatarImageUri(publication.by)} />
                <AvatarFallback>{handleName.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div className="ml-2 text-s font-medium">{handleName}</div>
          </Link>
        </div>
        <Link href={`/gallery/${publication.id}`} passHref>
          <div className="relative cursor-pointer">
            <img src={imageSource.cover} alt={getTitle(publication)} className="w-full h-96 object-cover" />
            {isPlayable && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-t-lg">
                <FiPlayCircle className="text-white text-4xl" />
              </div>
            )}
          </div>
        </Link>
        <div className="p-4">
          <div className="text-lg font-bold mb-2">{getTitle(publication)}</div>
          <hr className="my-2" />
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-xs text-muted-foreground">Price</div>
              <div className="text-base font-bold">{formattedPrice}</div>
            </div>
            {ownerProfile && (
              <div className="flex items-center">
                <div className="text-xs text-muted-foreground mr-2">Owned by</div>
                <Avatar className="w-6 h-6">
                  {typeof ownerProfile !== 'string' ? (
                    <>
                      <AvatarImage src={getProfileAvatarImageUri(ownerProfile)} />
                      <AvatarFallback>{ownerProfile.handle?.localName.charAt(0)}</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarFallback>0x</AvatarFallback>
                      <span>{nftOwnerAddress ? nftOwnerAddress.slice(0, 8) : "No Owner"}</span>
                    </>
                  )}
                </Avatar>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-4">
        {buyNowStatus === 'sold out' ? (
          <Button style={{ width: '100%' }} className='w-full mb-1' disabled>
            {buyNowStatus === 'sold out' ? 'Sold Out' : 'Sale Ended'}
          </Button>
        ) : (
          <ShineBorder color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className='w-full p-1' borderRadius={10}>
            <Button asChild style={{ width: '100%' }} className='w-full'>
              <Link href={`/gallery/${publication.id}`}>Buy Now</Link>
            </Button>
          </ShineBorder>
        )}
      </div>
    </div>
  );
};
