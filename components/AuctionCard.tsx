import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import Countdown from 'react-countdown';
import { cn, getPostMediaSource, getProfileAvatarImageUri, getTitle, isGenesisDropArtist, parseFromLensHex } from '@/lib/utils';
import { FiPlayCircle } from 'react-icons/fi';
import ShineBorder from "@/components/magicui/shine-border";
import useAuctions from '@/app/hooks/useAuctions';
import { Post, useLastLoggedInProfile } from '@lens-protocol/react-web';
import { getAuctionStatusAndTimeLeft } from '@/lib/publicationUtils';
import { polygon, polygonAmoy } from 'viem/chains';
import { useReadAuctionsOaGetCollectNft, useReadErc721OwnerOf } from '@/src/generated';
import SparklesText from './magicui/sparkles-text';
import { Skeleton } from '@/components/ui/skeleton';
import AnimatedGradientText from "./magicui/animated-gradient-text";

const formatBonsaiValue = (value: number) => {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();
};

const activeAuctionRenderer = ({ days, hours, minutes, seconds }) => {
  if (days > 0) {
    return (
      <AnimatedGradientText className="font-bold">
        <span className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#4b0082] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}>
          {days}d {hours}h left
        </span>
      </AnimatedGradientText>
    );
  } else if (hours > 0) {
    return (
      <AnimatedGradientText className="font-bold">
        <span className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#4b0082] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}>
          {hours}h {minutes}m left
        </span>
      </AnimatedGradientText>
    );
  } else {
    return (
      <AnimatedGradientText className="font-bold">
        <span className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#4b0082] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}>
          {minutes}m {seconds}s left
        </span>
      </AnimatedGradientText>
    );
  }
};

export const AuctionCard = ({ publication }: { publication: Post }) => {
  const requiredChainId = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? polygon.id : polygonAmoy.id;
  const intPublicationId = parseFromLensHex(publication.id);
  const handleName = publication.by?.handle?.localName || 'unknown';

  const { data: auctionNFTAddress, isLoading: isAuctionLoading } = useReadAuctionsOaGetCollectNft({
    args: [intPublicationId.profileId, intPublicationId.publicationId],
    chainId: requiredChainId,
  });

  const { data: nftOwnerAddress, isLoading: isOwnerLoading } = useReadErc721OwnerOf({
    args: [BigInt(1)],
    address: auctionNFTAddress,
    chainId: requiredChainId,
  });

  const { data: ownerProfile, loading: isProfileLoading } = useLastLoggedInProfile({ for: nftOwnerAddress || '0x1234567890123456789012345678901234567890' });

  const { auctions, loading, error } = useAuctions(publication.id);
  const auction = auctions ? auctions[0] : null;

  const isLoading = loading || isAuctionLoading || isOwnerLoading || isProfileLoading;

  if (isLoading) {
    return (
      <div className="bg-background rounded-lg overflow-hidden shadow-lg mb-4 flex flex-col h-full">
        <div className="p-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-96 w-full mt-2" />
          <Skeleton className="h-6 w-40 mt-2" />
          <Skeleton className="h-6 w-16 mt-2" />
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error?.message}</div>;
  if (!auction) return <div>No Auction Found</div>;

  const { auctionStatus, timeLeft } = getAuctionStatusAndTimeLeft(auction);
  const imageSource = getPostMediaSource(publication);
  const isPlayable = publication.metadata.__typename === 'AudioMetadataV3' || publication.metadata.__typename === 'VideoMetadataV3';

  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-lg mb-4 flex flex-col h-full">
      <div className="flex-1">
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
          {auctionStatus === "Active auction" && (
            <span className="ml-auto inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-800">
              <SparklesText className="text-sm" sparklesCount={3} colors={{ first: '#daa520', second: '#72016f' }} text="Auction Live" />
            </span>
          )}
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
          <div className="">
            {auctionStatus === "Active auction" ? (
              <>
                <div>
                  <div className="text-xs text-muted-foreground">Highest Bid</div>
                  <div className="text-base font-bold">{formatBonsaiValue(auction.winningBid / 1e18)} BONSAI</div>
                </div>
                <Countdown date={new Date(parseInt(auction.endTimestamp) * 1000)} renderer={activeAuctionRenderer} />
              </>
            ) : auctionStatus === "Art collected" ? (
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-xs text-muted-foreground">Winning Bid</div>
                  <div className="text-base font-bold">{formatBonsaiValue(auction.winningBid / 1e18)} BONSAI</div>
                </div>
                <div className="flex items-center">
                  <div className="text-xs text-muted-foreground mr-2">Owned by</div>
                  <Avatar className="w-6 h-6">
                    {ownerProfile && typeof ownerProfile !== 'string' ? (
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
              </div>
            ) : (
              <div>
                <div className="text-xs text-muted-foreground">Reserve Price</div>
                <div className="text-base font-bold">{formatBonsaiValue(auction.reservePrice / 1e18)} BONSAI</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 mt-auto">
        {auctionStatus === "Active auction" || auctionStatus === "Active but not started" ? (
          <Link href={`/gallery/${auction.id}`} passHref>
            <ShineBorder color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className='w-full p-1' borderRadius={10}>
              <Button variant="default" size="sm" className="w-full">
                Place Bid
              </Button>
            </ShineBorder>
          </Link>
        ) : auctionStatus === "Not started" ? (
          <Button variant="default" size="sm" className="w-full" disabled>
            <Countdown date={new Date(parseInt(auction.availableSinceTimestamp) * 1000)} />
          </Button>
        ) : (
          <Button variant="default" size="sm" className="w-full" disabled>
            Sold Out
          </Button>
        )}
      </div>
    </div>
  );
};
