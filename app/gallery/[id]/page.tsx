'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePublication, Post, useSession } from '@lens-protocol/react-web';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useOpenAction, OpenActionKind } from '@lens-protocol/react-web';
import { useAccount } from 'wagmi';
import Link from "next/link";
import { getTitle, getPostSellType } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { FALLBACK_IMAGE_URL } from '../../constants';
import AuctionComponent from '../../../components/AuctionComponent';
import { awardPoints } from '@/lib/utils';
import { COLLECT_PERCENT_AWARD, BONSAI_ADDRESS } from '@/app/constants';
import { useReadErc20Allowance, useWriteErc20Approve } from '@/src/generated';
import { polygon, polygonAmoy } from 'wagmi/chains';
import { Address } from 'viem';
import ReactPlayer from 'react-player';

function getMediaSource(post: Post): { type: 'image' | 'video' | 'audio' | 'text', src: string, cover?: string } | null {
  if (!post?.metadata) {
    return null;
  }

  switch (post.metadata.__typename) {
    case 'AudioMetadataV3':
      return { 
        type: 'audio', 
        src: post.metadata.asset?.audio?.optimized?.uri || FALLBACK_IMAGE_URL,
        cover: post.metadata.asset?.cover?.optimized?.uri || FALLBACK_IMAGE_URL
      };
    case 'VideoMetadataV3':
      return { type: 'video', src: post.metadata.asset?.video?.optimized?.uri || FALLBACK_IMAGE_URL };
    case 'ImageMetadataV3':
      return { type: 'image', src: post.metadata.asset?.image?.optimized?.uri || FALLBACK_IMAGE_URL };
    default:
      return { type: 'text', src: FALLBACK_IMAGE_URL };
  }
}

function GalleryPostDetails({ params }) {
  const fallbackImage = '/images/fallback-image.png';
  const CHAIN_ID = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? polygon.id : polygonAmoy.id;
  const OPEN_ACTION_MODULE_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? '0x857b5e09d54AD26580297C02e4596537a2d3E329' : '0xd935e230819AE963626B31f292623106A3dc3B19';

  const { data, error, loading } = usePublication({ forId: params.id });
  const post = data as Post;
  const [isCollected, setIsCollected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaleEnded, setIsSaleEnded] = useState(false);
  const { address } = useAccount();
  const { data: sessionData } = useSession();
  const [moduleAddress, setModuleAddress] = useState<Address | undefined>(undefined);
  const walletAddress = sessionData?.authenticated ? sessionData.address : undefined;
  const { execute } = useOpenAction({
    action: {
      kind: OpenActionKind.COLLECT,
    },
  });

  const { data: allowance, refetch: refetchAllowance } = useReadErc20Allowance({
    address: BONSAI_ADDRESS,
    chainId: CHAIN_ID,
    args: [walletAddress as Address, moduleAddress as Address]
  });

  const { writeContractAsync } = useWriteErc20Approve();

  const checkAndApproveAllowance = async () => {
    if (!allowance || allowance < BigInt(postPrice * (10 ** 18))) {
      try {
        const tx = await writeContractAsync({
          address: BONSAI_ADDRESS,
          chainId: CHAIN_ID,
          args: [moduleAddress as Address, BigInt(postPrice * (10 ** 18))]
        });
      } catch (error) {
        console.error("Failed to approve allowance:", error);
        window.alert("Failed to approve allowance.");
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (post && post.__typename === 'Post' && post?.stats.collects > 0) {
      setIsCollected(true);
    }

    if (post && post.openActionModules) {
      for (let actionModule of post.openActionModules) {
        if (
          actionModule.__typename === "SimpleCollectOpenActionSettings" ||
          actionModule.__typename === "MultirecipientFeeCollectOpenActionSettings"
        ) {
          setModuleAddress(actionModule.contract.address as Address);
          const endsAt = actionModule.endsAt;
          if (endsAt && new Date(endsAt) < new Date()) {
            setIsSaleEnded(true);
            break;
          }
        }
      }
    }
  }, [post]);

  const collect = async () => {
    if (!address) {
      alert('Connect your wallet first');
      return;
    } else if (!sessionData?.authenticated) {
      alert('Login first');
      return;
    }
    if (!post) {
      alert('Post is undefined');
      return;
    }

    const allowanceApproved = await checkAndApproveAllowance();
    if (!allowanceApproved) return;

    const result = await execute({ publication: post });

    if (result.isFailure()) {
      alert('There was an error broadcasting the transaction: ' + result.error.message);
      setIsLoading(false);
      return;
    }

    const completion = await result.value.waitForCompletion();

    if (completion.isFailure()) {
      throw new Error(completion.error.message || 'There was an error processing the transaction');
    }

    setIsCollected(true);
    setIsLoading(false);

    if (completion.isSuccess()) {
      if (sessionData?.address != post.by.ownedBy.address) {
        awardPoints(sessionData?.address, COLLECT_PERCENT_AWARD * postPrice, 'Collect (Buyer)', null);
        awardPoints(post.by.ownedBy.address, COLLECT_PERCENT_AWARD * postPrice, 'Collect (Seller)', null); 
      } else {  
        awardPoints(post.by.ownedBy.address, 0, 'Try selling to someone else =)', null); 
      }
    }

    alert('Post collected!');
  };

  const postTitle = getTitle(post);

  let postPrice: number = 0;
  if (post && post.openActionModules) {
    for (let actionModule of post.openActionModules) {
      if (actionModule.__typename === "SimpleCollectOpenActionSettings" || actionModule.__typename === "MultirecipientFeeCollectOpenActionSettings" && Number(actionModule.amount.value) > 0) {
        postPrice = Math.floor(Number(actionModule.amount.value));
        break;
      }
    }
  }

  const formattedPrice = postPrice ? `${postPrice} BONSAI` : 'Not for sale';

  const mediaSource = getMediaSource(post);
  const isPlayable = post ? post.metadata?.__typename === 'AudioMetadataV3' || post.metadata?.__typename === 'VideoMetadataV3' : false;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!post) return <div>Post not found!</div>;

  const displayName = post?.by?.metadata?.displayName || 'Unknown Artist';
  const handleName = post?.by?.handle?.localName || 'unknown';

  const profilePictureUri = post.by?.metadata?.picture?.__typename === 'ImageSet' 
    ? post.by.metadata.picture.optimized?.uri 
    : post.by?.metadata?.picture?.__typename === 'NftImage' 
    ? post.by.metadata.picture.image?.optimized?.uri 
    : '/placeholder-avatar.jpg';

  const content = post.metadata.__typename !== 'EventMetadataV3' 
    ? post.metadata.content
    : "";

  const sellType = getPostSellType(post);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-6 mt-20">
        <div className="md:col-span-2 flex flex-col gap-4">
          {(mediaSource?.type === 'image' || mediaSource?.type === 'text') && (
            <img src={mediaSource.src || fallbackImage} alt="NFT Image" className="rounded-sm object-cover aspect-square" />
          )}
          {mediaSource?.type === 'video' && (
            <ReactPlayer url={mediaSource.src} controls className="rounded-sm object-cover aspect-square" />
          )}
          {mediaSource?.type === 'audio' && (
            <div className="flex flex-col items-center">
              <img src={mediaSource?.cover || '/images/fallback-image.jpg'} alt="Cover" className="rounded-sm object-cover aspect-square" />
              <ReactPlayer url={mediaSource.src} controls className="w-full" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Link href={`/${handleName}`}>
              <Avatar>
                <AvatarImage alt={displayName} src={profilePictureUri} />
                <AvatarFallback>{handleName.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h3 className="text-lg font-semibold">{displayName}</h3>
              <p className="text-gray-500 dark:text-gray-400">{"@" + handleName}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{postTitle}</h1>
            <ReactMarkdown className="text-gray-500 dark:text-gray-400">
              {content || 'This NFT is a unique digital artwork created by the artist.'}
            </ReactMarkdown>
          </div>
          <div className="flex flex-col gap-4">
            <Separator className="my-4" />
            {sellType === 'buy_now' && (
              <div>
                <div className="grid mb-4">
                  <div>
                    <h3 className="text-s font-thin">List Price: <span className="text-xl font-semibold">{formattedPrice}</span></h3>
                  </div>
                </div>
                <Button className='rounded-sm w-full' onClick={collect} disabled={isCollected || isLoading || isSaleEnded || !sessionData?.authenticated}>
                  {isLoading ? 'Loading...' : !sessionData?.authenticated ? 'Login to Lens First.' : isCollected ? 'Sold Out' : isSaleEnded ? 'Sale Ended' : 'BUY NOW'}
                </Button>
              </div>
            )}
            {sellType === 'auction' && (
              <AuctionComponent post={post} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GalleryPostDetails;
