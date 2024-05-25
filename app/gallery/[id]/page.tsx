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
import { getTitle } from '@/utils/utils';
import ReactMarkdown from 'react-markdown';

function getMediaSource(post: Post): { type: 'image' | 'video' | 'audio', src: string, cover?: string } | null {
  if (!post?.metadata) {
    return null;
  }

  switch (post.metadata.__typename) {
    //todo: criar uma forma de tratar o textonly
    case 'ArticleMetadataV3':
    case 'CheckingInMetadataV3':
    case 'EmbedMetadataV3':
    case 'EventMetadataV3':
    case 'LinkMetadataV3':
    case 'LiveStreamMetadataV3':
    case 'MintMetadataV3':
    case 'SpaceMetadataV3': 
    case 'TransactionMetadataV3':
    case 'ThreeDMetadataV3':
      const firstAttachment = post.metadata.attachments?.[0];
      if (firstAttachment?.__typename === 'PublicationMetadataMediaAudio') {
        return { type: 'image', src: firstAttachment.cover?.optimized?.uri || '' };
      }
      if (firstAttachment?.__typename === 'PublicationMetadataMediaVideo') {
        return { type: 'video', src: firstAttachment.video?.optimized?.uri || '' };
      }
      return { type: 'image', src: firstAttachment?.image?.optimized?.uri || '' };
    case 'AudioMetadataV3':
      return { 
        type: 'audio', 
        src: post.metadata.asset?.audio?.optimized?.uri || '',
        cover: post.metadata.asset?.cover?.optimized?.uri || ''
      };
    case 'VideoMetadataV3':
      return { type: 'video', src: post.metadata.asset?.video?.optimized?.uri || '' };
    case 'ImageMetadataV3':
      return { type: 'image', src: post.metadata.asset?.image?.optimized?.uri || '' };
    case 'StoryMetadataV3':
      const asset = post.metadata.asset?.[0];
      if (asset?.__typename === 'PublicationMetadataMediaAudio') {
        return { type: 'image', src: asset.cover?.optimized?.uri || '' };
      }
      if (asset?.__typename === 'PublicationMetadataMediaVideo') {
        return { type: 'video', src: asset.video?.optimized?.uri || '' };
      }
      return { type: 'image', src: asset?.image?.optimized?.uri || '' };
    default:
      return { type: 'image', src: '' };
  }
}

function GalleryPostDetails({ params }) {
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

    //adaptar e modularizar para esquemas mais complexos de open actions

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

  let avatarPictureUri; // default picture
    if (post.by?.metadata?.picture && 'optimized' in post.by?.metadata?.picture) {
      avatarPictureUri = post.by?.metadata?.picture?.optimized?.uri;
    }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!post) return <div>Post not found!</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col gap-4">
          {mediaSource?.type === 'image' && (
            <img src={mediaSource.src} alt="NFT Image" className="rounded-xl object-cover aspect-square" />
          )}
          {mediaSource?.type === 'video' && (
            <video src={mediaSource?.src} controls className="rounded-xl object-cover aspect-square" />
          )}
          {mediaSource?.type === 'audio' && (
            <div className="flex flex-col items-center">
              <img src={mediaSource?.cover || ''} alt="Cover" className="rounded-xl object-cover aspect-square" />
              <audio src={mediaSource.src} controls className="w-full" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Link href={`/${post?.by?.handle?.localName}`}>
              <Avatar>
                <AvatarImage alt={post.by?.metadata?.displayName || "Art by Mystic Garden"} src={avatarPictureUri || '/placeholder-avatar.jpg'} />
                <AvatarFallback>{post.by?.metadata?.displayName?.charAt(0) || 'A'}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h3 className="text-lg font-semibold">{post.by?.metadata?.displayName || post.by?.handle?.localName}</h3>
              <p className="text-gray-500 dark:text-gray-400">Digital Artist</p>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{postTitle}</h1>
            <ReactMarkdown className="text-gray-500 dark:text-gray-400">
              {'content' in post.metadata? post.metadata?.content : 'This artist has not provided a description.'}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default GalleryPostDetails;
