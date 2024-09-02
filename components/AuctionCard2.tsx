import React, { useState, useEffect, useCallback } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Countdown from 'react-countdown';
import ShineBorder from "@/components/magicui/shine-border";
import { FaPlay } from 'react-icons/fa';
import { AuctionWithPublicationId } from "@/app/types/auction";
import { getAuctionStatusAndTimeLeft } from "@/lib/publications";
import { cn, convertProfileIdToHex, getAuctionMediaSource, getProfileAvatarImageUri, isGenesisDropArtist, parseFromLensHex } from "@/lib/utils";
import SparklesText from "./magicui/sparkles-text";
import { polygon, polygonAmoy } from "viem/chains";
import { useReadAuctionsOaGetCollectNft, useReadErc721OwnerOf } from "@/src/generated";
import { ProfileId, useLastLoggedInProfile, useProfile } from "@lens-protocol/react-web";
import AnimatedGradientText from "./magicui/animated-gradient-text";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Auction started!</span>;
    } else {
      return (
        <span>
          {days}d {hours}h {minutes}m {seconds}s left to start
        </span>
      );
    }
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

const AuctionCard2 = ({ auction }: { auction: AuctionWithPublicationId }) => {

    const { data: auctionWinnerProfile, error, loading } = useProfile({ forProfileId: convertProfileIdToHex(auction.winnerProfileId) as ProfileId });

    const { auctionStatus, timeLeft } = getAuctionStatusAndTimeLeft(auction);
    const isVideo = !!auction?.metadata?.asset?.video?.optimized?.uri;
    const hasCover = !!auction?.metadata?.asset?.cover?.optimized?.uri;

    const requiredChainId = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? polygon.id : polygonAmoy.id;
    const intPublicationId = parseFromLensHex(auction.id);

    const artistAvatarUri = auction.by.metadata?.picture?.optimized?.uri || "/placeholder-user.jpg"

  const { data: auctionNFTAddress } = useReadAuctionsOaGetCollectNft({
    args: [intPublicationId.profileId, intPublicationId.publicationId],
    chainId: requiredChainId,
  });

  const { data: nftOwnerAddress } = useReadErc721OwnerOf({
    args: [BigInt(1)],
    address: auctionNFTAddress,
    chainId: requiredChainId,
  });

  const { data: ownerProfile } = useLastLoggedInProfile({ for: nftOwnerAddress ? nftOwnerAddress : '' });

return(
<div key={auction.id} className="bg-background rounded-lg overflow-hidden shadow-lg">
                <div className="flex items-center mb-2 p-4">
                <Link href={"/" + auction.by?.handle?.localName} className='flex items-center'>
            {isGenesisDropArtist(auction.by?.id) ? (
              <ShineBorder
                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                borderRadius={99}
                className="h-7 w-7 justify-center items-center"
                borderWidth={2.5}>
                <Avatar className="w-6 h-6">
                  <AvatarImage src={artistAvatarUri} />
                  <AvatarFallback>{auction.by?.handle?.localName.charAt(0)}</AvatarFallback>
                </Avatar>
              </ShineBorder>
            ) : (
              <Avatar className="w-6 h-6">
                <AvatarImage src={artistAvatarUri} />
                <AvatarFallback>{auction.by?.handle?.localName.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div className="ml-2 text-s font-medium">{auction.by?.handle?.localName}</div>
          </Link>
                  {auctionStatus === "Active auction" && (
                        <span className="ml-auto inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-800"><SparklesText className="text-sm" sparklesCount={3} colors={{ first: '#daa520', second: '#72016f' }} text="Auction Live" /></span>
                    )}
                </div>
                <Link href={`/gallery/${auction.id}`} passHref>
                  <div className="relative cursor-pointer">
                    {hasCover ? (
                      <>
                        <img src={getAuctionMediaSource(auction).cover} alt={auction.metadata.title} className="w-full h-96 object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-t-lg">
                          <FaPlay className="text-white text-4xl" />
                        </div>
                      </>
                    ) : (
                      isVideo ? (
                        <video src={getAuctionMediaSource(auction).src} controls className="w-full h-96 object-cover"></video>
                      ) : (
                        <img src={getAuctionMediaSource(auction).cover} alt={auction.metadata.title} className="w-full h-96 object-cover" />
                      )
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <div className="text-lg font-bold mb-2">{auction.metadata.title}</div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center mb-4">
                    {auctionStatus === "Active auction" ? (
                      <>
                        <div>
                          <div className="text-xs text-muted-foreground">Highest Bid</div>
                          <div className="text-base font-bold">{auction.winningBid / 1e18} BONSAI</div>
                        </div>
                        <Countdown date={new Date(parseInt(auction.endTimestamp) * 1000)} renderer={activeAuctionRenderer} />
                      </>
                    ) : auctionStatus === "Active but not started" ? (
                      <>
                        <div>
                          <div className="text-xs text-muted-foreground">Reserve Price</div>
                          <div className="text-base font-bold">{auction.reservePrice / 1e18} BONSAI</div>
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                          Place the first bid!
                        </div>
                      </>
                    ) : auctionStatus === "Not started" ? (
                      <>
                        <div>
                          <div className="text-xs text-muted-foreground">Reserve Price</div>
                          <div className="text-base font-bold">{auction.reservePrice / 1e18} BONSAI</div>
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                          <Countdown date={new Date(parseInt(auction.availableSinceTimestamp) * 1000)} renderer={renderer} />
                        </div>
                      </>
                    ) : auctionStatus === "Auction ended, pending collection" ? (
                      <>
                        <div>
                          <div className="text-xs text-muted-foreground">Winning Bid</div>
                          <div className="text-base font-bold">{auction.winningBid / 1e18} BONSAI</div>
                        </div>
                        <div className="flex items-center">
                        <div className="text-xs text-muted-foreground mr-2">Auction Not Settled</div>
                        </div>
                      </>
                    ) : (

                        <>
                        <div>
                          <div className="text-xs text-muted-foreground">Winning Bid</div>
                          <div className="text-base font-bold">{auction.winningBid / 1e18} BONSAI</div>
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
                      </>
                    )
                    
                    }
                  </div>
                  {auctionStatus === "Active auction" || auctionStatus === "Active but not started" ? (
                    <div className="flex gap-2">
                      <Link href={`/gallery/${auction.id}`} passHref className="w-full">
                        <ShineBorder color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className="p-1 w-full" borderRadius={10}>
                          <Button variant="default" size="sm" className="w-full">
                            Place Bid
                          </Button>
                        </ShineBorder>
                      </Link>
                      <Link href={`/gallery/${auction.id}`} passHref className="w-full">
                        <Button variant="outline" size="sm" className="w-full m-1">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ) : auctionStatus === "Not started" ? (
                    <div className="flex gap-2">
                      <Button variant="default" size="sm" className="w-full" disabled>
                        <Countdown date={new Date(parseInt(auction.availableSinceTimestamp) * 1000)} renderer={renderer} />
                      </Button>
                      <Link href={`/gallery/${auction.id}`} passHref className="w-full">
                        <Button variant="outline" size="sm" className="w-full m-1">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="default" size="sm" className="w-full" disabled>
                        Sold Out
                      </Button>
                      <Link href={`/gallery/${auction.id}`} passHref className="w-full">
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
                }


                export default AuctionCard2;