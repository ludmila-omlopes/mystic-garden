'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePublication, Post, useSession } from '@lens-protocol/react-web';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useOpenAction, OpenActionKind } from '@lens-protocol/react-web';
import Hls from 'hls.js';
import { useAccount } from 'wagmi';
import axios from 'axios';

function getMediaSource(post: Post): { type: 'image' | 'video' | 'audio', src: string, cover?: string } | null {
  if (!post?.metadata) {
    return null;
  }

  switch (post.metadata.__typename) {
    // Additional cases here...
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
    default:
      return { type: 'image', src: '' };
  }
}

function GalleryPostDetails({ params }) {
  const { data, error, loading } = usePublication({ forId: params.id });
  const post = data as Post;
  const [isCollected, setIsCollected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [moreNfts, setMoreNfts] = useState([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { address } = useAccount();
  const { data: sessionData } = useSession();
  const { execute } = useOpenAction({
    action: {
      kind: OpenActionKind.COLLECT,
    },
  });

  /*useEffect(() => {
    if (post && post.__typename === 'Post' && post?.stats.collects > 0) {
      setIsCollected(true);
    }

    // Fetch more NFTs by the same artist
    if (post?.by?.profileId) {
      axios.get(`/api/nfts/artist/${post.by.profileId}`).then(response => {
        setMoreNfts(response.data);
      });
    }
  }, [post]);*/

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

  let content: string | undefined;
  if (post && 'metadata' in post && post.metadata && 'content' in post.metadata) {
    content = post.metadata.content;
  }

  let postTitle = post?.metadata?.marketplace?.name || '';
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
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        videoRef.current && videoRef.current.play();
      });
    }
  }, [mediaSource, isPlayable]);

  let pictureUri = '/placeholder-avatar.jpg';
    if (post?.by?.metadata?.picture?.__typename == "ImageSet") {
      pictureUri = post?.by?.metadata?.picture?.optimized?.uri || "";
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
            <video src={mediaSource.src} controls className="rounded-xl object-cover aspect-square" ref={videoRef} />
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
            <Avatar>
              <AvatarImage alt={post.by?.metadata?.displayName || "Art by Mystic Garden"} src={pictureUri || '/placeholder-avatar.jpg'} />
              <AvatarFallback>{post.by?.metadata?.displayName?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{post.by?.metadata?.displayName || post.by?.handle?.localName}</h3>
              <p className="text-gray-500 dark:text-gray-400">Digital Artist</p>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{postTitle}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {content || 'This NFT is a unique digital artwork created by the artist.'}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {/*
              <div>
                <h3 className="text-lg font-semibold">Current Owner</h3>
                <p className="text-gray-500 dark:text-gray-400">{address}</p>
              </div>
        */}
              <div>
                <h3 className="text-lg font-semibold">Price</h3>
                <p className="text-gray-500 dark:text-gray-400">{formattedPrice}</p>
              </div>
            </div>
            <Separator className="my-4" />
            <Button size="lg" onClick={collect} disabled={isCollected || isLoading}>
              {isLoading ? 'Loading...' : isCollected ? 'Sold Out' : 'Purchase'}
            </Button>
          </div>
        </div>
      </div>
      {/* <section className="max-w-6xl mx-auto py-12 px-4 md:px-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">More by {post.by?.metadata?.displayName}</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Explore other captivating NFT artworks by the digital artist, {post.by?.metadata?.displayName}.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreNfts.map(nft => (
              <div className="flex flex-col gap-4" key={nft.id}>
                <img
                  alt={nft.title}
                  className="rounded-xl object-cover aspect-square"
                  height="400"
                  src={nft.image}
                  width="400"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{nft.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{nft.description}</p>
                  <div className="flex items-center gap-2">
                    <BitcoinIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">{nft.price} ETH</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
          </section>*/ }
    </>
  );
}

function BitcoinIcon(props) {
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
      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
    </svg>
  );
}

export default GalleryPostDetails;
