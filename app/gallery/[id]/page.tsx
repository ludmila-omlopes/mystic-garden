'use client'

import React, { useState, useEffect, useRef } from 'react';
import { usePublication, Post } from '@lens-protocol/react-web';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { useOpenAction, OpenActionKind, useLogin} from '@lens-protocol/react-web';
import Hls from 'hls.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAccount } from 'wagmi';
import { useLoginState } from '@/app/loginStateProvider';

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
      return {type: 'image', src: '' };
  }
}

function GalleryPostDetails({ params }) {
  const { data, error, loading } = usePublication({ forId: params.id });
  const post = data as Post;
  const [isCollected, setIsCollected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { address } = useAccount()
  //const { data: loginData } = useLogin();
  const { isLoggedIn, setIsLoggedIn, profileId, setProfileId } = useLoginState();

  const { execute } = useOpenAction({
    action: {
      kind: OpenActionKind.COLLECT,
    },
  });

  useEffect(() => {
    if (post && post.__typename == 'Post' && post?.stats.collects > 0) {
      setIsCollected(true);
    }
  }, [post]);

  const collect = async () => {
    if(!address) {
      alert('Connect your wallet first');
      return; }
      else if(!isLoggedIn) {
        alert('Login first');
        return;
      }
    if (!post) {
      alert('Post is undefined');
      return;
    }
    const result = await execute({ publication: post });

    if (result.isFailure()) {
      alert('There was an error broadcasting the transaction'+ result.error.message);
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

//TODO: cobrir o caso de "follow to collect"

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



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!post) return <div>Post not found!</div>;

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center bg-gray-900 text-white">
      <div className="flex-1 p-4 lg:ml-8">
    {mediaSource?.type === 'image' ? (
      <img src={mediaSource.src} alt="Artwork" className="h-auto lg:max-w-3xl lg:max-h-[90vh]" />
    ) : mediaSource?.type === 'video' ? (
      <video src={mediaSource?.src} controls className="h-auto lg:max-w-3xl lg:max-h-[90vh]" />
    ) : mediaSource?.type === 'audio' ? (
      <div className="flex flex-col items-center">
        <img src={mediaSource.cover} alt="Cover" className="h-auto lg:max-w-3xl lg:max-h-[90vh]" />
        <audio src={mediaSource?.src} controls className="w-full" />
      </div> 
    ) : null}
  </div>
      <div className="flex-1 p-4 lg:ml-8">
        <Card>
          <CardHeader>
            <Avatar>
            <AvatarImage src={(post.by?.metadata?.picture && 'optimized' in post.by.metadata.picture) ? post.by.metadata.picture?.optimized?.uri : undefined} />
              <AvatarFallback>{post?.by?.handle?.localName.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="text-left">
            <CardTitle>{post?.by.metadata?.displayName}</CardTitle>
            <div>Teste: {profileId}</div>
            <CardDescription>{post?.by?.handle?.localName}</CardDescription>
            <ReactMarkdown>{content || 'Content not available'}</ReactMarkdown>
          </CardContent>
          <CardFooter className="flex-col items-start">
            <div>
              <span className="text-sm text-gray-500">Price</span>
              <div className="text-2xl font-bold">{formattedPrice}</div>
            </div>
            <Button className="w-full" onClick={collect} disabled={isCollected || isLoading}>
              {isLoading ? 'Loading...' : isCollected ? 'Collected' : 'Buy now'}
            </Button>
            <Button variant="outline"
          className="w-full mt-4"
          onClick={() => window.open(`https://share.lens.xyz/p/${post.id}`, '_blank')}
        >
          More Details
        </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}


export default GalleryPostDetails;
