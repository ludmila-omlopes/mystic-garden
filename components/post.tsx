import * as React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'; // Import your Avatar components
import { Button } from '@/components/ui/button';
import { MessageSquare, Repeat2, Heart, Grab } from 'lucide-react'; // Import your icons
import ReactMarkdown from 'react-markdown';

export default function Post({ publication }) {
  return (
    <div
      className="border-b"
      key={publication.id}
      onClick={() => window.open(`https://share.lens.xyz/p/${publication.id}`, '_blank')}
    >
      <div className="space-y-3 mb-4 pt-6 pb-2 sm:px-6 px-2">
        <div className="flex">
          <Avatar>
            <AvatarImage src={publication.by?.metadata?.picture?.optimized?.uri} />
            <AvatarFallback>{publication.by.handle.localName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h3 className="mb-1 font-medium leading-none">{publication.by.handle.localName}.{publication.by.handle.namespace}</h3>
            <p className="text-xs text-muted-foreground">{publication.by.metadata?.displayName}</p>
          </div>
        </div>
        <div>
          <img
            className="max-w-full sm:max-w-[500px] rounded-2xl h-auto object-cover transition-all hover:scale-105"
            src={publication.__typename === 'Post' ? publication.metadata?.asset?.image?.optimized?.uri : ''}
          />
          <ReactMarkdown className="mt-4 break-words">
            {publication.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
          </ReactMarkdown>
        </div>
        <div>
          <Button className="rounded-full mr-1" variant="secondary">
            <MessageSquare className="mr-2 h-4 w-4" />
            {publication.stats.comments}
          </Button>
          <Button className="rounded-full mr-1" variant="secondary">
            <Repeat2 className="mr-2 h-4 w-4" />
            {publication.stats.mirrors}
          </Button>
          <Button className="rounded-full mr-1" variant="secondary">
            <Heart className="mr-2 h-4 w-4" />
            {publication.stats.upvotes}
          </Button>
          <Button className="rounded-full mr-1" variant="secondary">
            <Grab className="mr-2 h-4 w-4" />
            {publication.stats.collects}
          </Button>
        </div>
      </div>
    </div>
  );
}