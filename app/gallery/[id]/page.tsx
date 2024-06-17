'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePublication, Post, useSession } from '@lens-protocol/react-web';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useOpenAction, OpenActionKind } from '@lens-protocol/react-web';
import Hls from 'hls.js';
import { useAccount } from 'wagmi';
import Link from "next/link";
import { getTitle } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { FALLBACK_IMAGE_URL } from '../../constants';
import AuctionComponent from '../../../components/AuctionComponent';

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
  const { data, error, loading } = usePublication({ forId: params.id });
  const post = data as Post;
  const [isCollected, setIsCollected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaleEnded, setIsSaleEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { address } = useAccount();
  const { data: sessionData } = useSession();
  const { execute } = useOpenAction({
    action: {
      kind: OpenActionKind.COLLECT,
    },
  });

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
    const result = await execute({ publication: post });

    if (result.isFailure()) {
      alert('There was an error broadcasting the transaction: ' + result.error.message);
      setIsLoading(false);
      return;
    }

    setIsCollected(true);
    setIsLoading(false);
    alert('Post collected!');
  };

  const postTitle = getTitle(post);

  let postPrice: number | null = null;
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

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current && isPlayable && mediaSource?.src) {
      const hls = new Hls();
      hls.loadSource(mediaSource?.src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.current && videoRef.current.play();
      });
    }
  }, [mediaSource, isPlayable]);

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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-6 mt-20"> {/* Added mt-20 to add space on top */}
        <div className="flex flex-col gap-4">
          {(mediaSource?.type === 'image' || mediaSource?.type === 'text') && (
            <img src={mediaSource.src || fallbackImage} alt="NFT Image test" className="rounded-xl object-cover aspect-square" />
          )}
          {mediaSource?.type === 'video' && (
            <video ref={videoRef} src={mediaSource?.src || '/images/fallback-image.jpg'} controls className="rounded-xl object-cover aspect-square" />
          )}
          {mediaSource?.type === 'audio' && (
            <div className="flex flex-col items-center">
              <img src={mediaSource?.cover || '/images/fallback-image.jpg'} alt="Cover" className="rounded-xl object-cover aspect-square" />
              <audio src={mediaSource.src || '/images/fallback-image.jpg'} controls className="w-full" />
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
              <p className="text-gray-500 dark:text-gray-400">{"@"+handleName}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{postTitle}</h1>
            <ReactMarkdown className="text-gray-500 dark:text-gray-400">
              {content || 'This NFT is a unique digital artwork created by the artist.'}
            </ReactMarkdown>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Price</h3>
                <p className="text-gray-500 dark:text-gray-400">{formattedPrice}</p>
              </div>
            </div>
            <Separator className="my-4" />
            <Button size="lg" onClick={collect} disabled={isCollected || isLoading || isSaleEnded}>
              {isLoading ? 'Loading...' : isCollected ? 'Sold Out' : isSaleEnded ? 'Sale Ended' : 'Purchase'}
            </Button>
            <div>
              <AuctionComponent post={post} />
        </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GalleryPostDetails;
