import * as React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { FiPlayCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import Link from "next/link";

export default function GalleryPost({ publication }) {
    const maxLength = 100; // Set the maximum length of the text before it gets truncated

    const content = publication.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '');
    const isTooLong = content.length > maxLength;
  
    const displayContent = isTooLong ? content.slice(0, maxLength) + '...' : content;

    const tag = publication.metadata.__typename.replace('MetadataV3', '');

    const fallbackImage = '/images/fallback-image.png';

    const isPlayable = publication.metadata.__typename === 'AudioMetadataV3' || publication.metadata.__typename === 'VideoMetadataV3';
    let imageSource = '';

    if (publication.metadata?.asset?.video || publication.metadata?.asset?.audio) {
        imageSource = publication.metadata.asset?.cover?.optimized?.uri || fallbackImage;
    } else if (publication.metadata?.asset?.image) {
      imageSource = publication.metadata.asset?.image.optimized?.uri || fallbackImage;
    } else {
      imageSource = fallbackImage;  // Use fallback image
    }

    let postPrice: number | null = null;
    if (publication && publication.openActionModules) {
      for (let actionModule of publication.openActionModules) {
        if (actionModule.__typename === "SimpleCollectOpenActionSettings" || actionModule.__typename === "MultirecipientFeeCollectOpenActionSettings" && Number(actionModule.amount.value) > 0) {
          postPrice = Math.floor(Number(actionModule.amount.value));
          break;
        }
      }
    }

    const formattedPrice = postPrice ? `${postPrice} BONSAI` : 'Not for sale';

    const displayName = publication.by?.metadata?.displayName || 'Unknown Artist';
    const handleName = publication.by?.handle?.localName || 'unknown';

    return (
      <Card className="border-b mb-4" key={publication.id}>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Link href={`/${handleName}`}>
              <Avatar>
                <AvatarImage src={publication.by?.metadata?.picture?.optimized?.uri || fallbackImage} />
                <AvatarFallback>{handleName.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h3 className="font-medium leading-none">{displayName}</h3>
              <p className="text-xs text-muted-foreground mb-1">{handleName}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div className="relative">
              <Link href={`/gallery/${publication.id}`}>
                <div className="relative aspect-w-1 aspect-h-1">
                  <img className="max-w-full sm:max-w-full rounded-2xl object-cover transition hover:scale-105 w-full" src={imageSource} />
                </div>
                {isPlayable && (
                  <FiPlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white" />
                )}
              </Link>
            </div>
            <div className="mt-4 mb-4"><Badge>{tag}</Badge></div>
            <div className="mt-4 mb-4 text-lg font-bold">
              {formattedPrice}
            </div>
            <ReactMarkdown className="mt-4 mb-4 break-words text-sm">
              {displayContent}
            </ReactMarkdown>
          </div>
          <Button asChild style={{ width: '100%' }}>
            <Link href={`/gallery/${publication.id}`}>
              Details
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
}
