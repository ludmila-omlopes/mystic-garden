'use client'

import React, { useState, useEffect } from 'react';
import { usePublication, Post } from '@lens-protocol/react-web';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { useOpenAction, OpenActionKind, useLogin } from '@lens-protocol/react-web';


function GalleryPostDetails({ params }) {
  const { data: post, error, loading } = usePublication({ forId: params.id });
  const { theme } = useTheme();
  const [isCollected, setIsCollected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { execute } = useOpenAction({
    action: {
      kind: OpenActionKind.COLLECT,
    },
  });

  let postDetails: Post | undefined;
  if (post) {
    postDetails = post as Post;
    }
  let imageSource: string | undefined;
  let isAudio = false;

  //TODO: mudar tudo isso pra switch case
  if (postDetails && postDetails.metadata && 'asset' in postDetails.metadata) {
    isAudio = postDetails.metadata.__typename === 'AudioMetadataV3';
    if (postDetails.metadata.asset) {
      if (isAudio && 'cover' in postDetails.metadata.asset && postDetails.metadata.asset.cover) {
        imageSource = postDetails.metadata.asset.cover.optimized?.uri;
      } else if ('image' in postDetails.metadata.asset && postDetails.metadata.asset.image) {
        imageSource = postDetails.metadata.asset.image.optimized?.uri;
      }
    }
  }

  let postPrice: number | null = null;

//TODO: cobrir o caso de "follow to collect"
  if (postDetails && postDetails.openActionModules) {
  for (let actionModule of postDetails.openActionModules) {
    if (actionModule.__typename === "SimpleCollectOpenActionSettings" || actionModule.__typename === "MultirecipientFeeCollectOpenActionSettings" && Number(actionModule.amount.value) > 0) {
      postPrice = Math.floor(Number(actionModule.amount.value));
      break;
    }
  }
}

  useEffect(() => {
    if (postDetails && postDetails.stats.collects > 0) {
      setIsCollected(true);
    }
  }, [postDetails]);

  const collect = async () => {
    setIsLoading(true);
    if (!post) {
      console.error('Post is undefined');
      setIsLoading(false);
      return;
    }
    const result = await execute({ publication: post });
  
    if (result.isFailure()) {
      switch (result.error.name) {
        case 'BroadcastingError':
          console.log('There was an error broadcasting the transaction', result.error.message);
          break;
        // Other error handling...
      }
      setIsLoading(false);
      return;
    }
  
    setIsCollected(true);
    setIsLoading(false);
    alert('Post collected!');
  }

   // Adjust the container styling to fit the image within a certain aspect ratio
   const imageContainerStyle = {
    width: '50%', // Use 50% of the container width
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  // Adjust the image styling to restrict its size
  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '80vh', // Adjust the maximum height to your preference
    objectFit: 'contain' as 'contain', // This will ensure that the image is scaled properly
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    postDetails ? (
      <div className={`flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div style={imageContainerStyle}>
          <img
            src={imageSource}
            alt={`Artwork titled 'Name Here'`}
            style={imageStyle}
          />
        </div>
        <div className="flex-shrink-0 w-full max-w-md p-4">
          <Card>
            <CardHeader>
              <Avatar>
              <AvatarImage src={postDetails.by?.metadata?.picture && 'optimized' in postDetails.by.metadata.picture ? postDetails.by.metadata.picture.optimized?.uri : undefined} />
                <AvatarFallback>{postDetails.by?.handle?.localName.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <CardTitle>{postDetails.by.metadata?.displayName}</CardTitle>
              <CardDescription>{postDetails.by?.handle?.localName}</CardDescription>
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Description</TabsTrigger>
                  <TabsTrigger value="tab2">Details</TabsTrigger>
                  <TabsTrigger value="tab3">History</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                <ReactMarkdown>
  {
    'content' in postDetails.metadata 
      ? postDetails.metadata.content 
      : 'Content not available'
  }
</ReactMarkdown>
                </TabsContent>
                <TabsContent value="tab2">
                  {/* Additional details content */}
                </TabsContent>
                <TabsContent value="tab3">
                  {/* Bid history content */}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
            <div>
      <p>Price: {postPrice ? `${postPrice} BONSAI` : 'Not for sale'}</p>
      {/* TODO: desabilitar o botão não é suficiente. O método precisa ser protegido, senão vai dar erro */}
      <Button style={{ width: '100%' }} onClick={collect} disabled={isCollected}>
      {isLoading ? 'Loading...' : isCollected ? 'Sold' : 'Collect'}
      </Button>
    </div>
      </CardFooter>
          </Card>
        </div>
      </div>
    ) : (
      // You can return a loading spinner or some placeholder content here
      <div>Loading...</div>
    )
  );
}

export default GalleryPostDetails;
