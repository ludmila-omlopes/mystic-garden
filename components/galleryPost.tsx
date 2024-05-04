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

    const isPlayable = publication.metadata.__typename === 'AudioMetadataV3' || publication.metadata.__typename === 'VideoMetadataV3';
    let imageSource = '';

    if (publication.metadata?.asset?.video) {
        imageSource = publication.metadata.asset?.cover?.optimized?.uri;
    } else if (publication.metadata?.asset?.image) {
      imageSource = publication.metadata.asset?.image.optimized?.uri;
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

  return (
    <Card className="border-b mb-4" key={publication.id}>
      <CardHeader>
        <div className="flex items-center space-x-4">
        <Link href={`/${publication?.by?.id}`}>
          <Avatar>
            <AvatarImage src={publication.by?.metadata?.picture?.optimized?.uri} />
            <AvatarFallback>{publication.by.handle.localName.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Link>
          <div>
            <h3 className="font-medium leading-none">{publication.by.metadata?.displayName}</h3>
            <p className="text-xs text-muted-foreground mb-1">{publication.by.handle.localName}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
            <div className="relative">
                <img
                    className="max-w-full sm:max-w-[500px] rounded-2xl h-auto object-cover transition hover:scale-105"
                    src={imageSource}
                />
                {isPlayable && (
                    <FiPlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white" />
                )}
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
};