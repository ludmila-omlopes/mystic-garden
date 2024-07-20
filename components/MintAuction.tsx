'use client';

import React, { useState } from 'react';
import { useCreatePost, useCurrencies, OpenActionType, useLazyModuleMetadata, Erc20, BroadcastingErrorReason } from '@lens-protocol/react-web';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { BONSAI_ADDRESS, REV_WALLET } from '@/app/constants';
import { uploadFile, uploadBigFile, uploadData, createMetadata, validateChainId, uploadFileFront } from '@/lib/utils';
import { encodeInitData } from '@/app/api/lib/lensModuleUtils';
import { AuctionInitData } from '@/lib/parseAuctionData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { awardPoints } from '@/lib/utils';
import { CREATE_NEW_AWARD } from '@/app/constants';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const MintAuction = ({ isAuthenticated, sessionData, title, description, file, fileName, coverFile }) => {
  const { execute, error: createPostError, loading: createPostLoading } = useCreatePost();
  const { data: currencies } = useCurrencies();
  const [reservePrice, setReservePrice] = useState('');
  const [minBidIncrement, setMinBidIncrement] = useState('');
  const [duration, setDuration] = useState('24h');
  const [minTimeAfterBid, setMinTimeAfterBid] = useState('');
  const [tokenRoyalty, setTokenRoyalty] = useState('10');
  const [auctionStartDate, setAuctionStartDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const OPEN_ACTION_MODULE_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? '0x857b5e09d54AD26580297C02e4596537a2d3E329' : '0xd935e230819AE963626B31f292623106A3dc3B19';
  const { execute: executeModuleMetadata } = useLazyModuleMetadata();
  const [progressMessage, setProgressMessage] = useState('');
  const { toast } = useToast();

  const durationMapping = {
    '24h': 24 * 60 * 60,
    '3 days': 3 * 24 * 60 * 60,
    '5 days': 5 * 24 * 60 * 60,
    '1 week': 7 * 24 * 60 * 60,
    '2 weeks': 14 * 24 * 60 * 60
  };

  async function fetchModuleMetadata(moduleAddress: string) {
    const result = await executeModuleMetadata({ implementation: moduleAddress });

    if (result.isFailure()) {
      setErrorMessage(result.error.message);
      return null;
    }

    const { metadata } = result.value;
    return metadata;
  }

  const validateFields = () => {
    if (!title || !description || !file) {
      setErrorMessage('Title, description, and file are required.');
      return false;
    }
    if (!reservePrice || isNaN(Number(reservePrice)) || Number(reservePrice) <= 0) {
      setErrorMessage('Valid reserve price is required.');
      return false;
    }
    if (!minBidIncrement || isNaN(Number(minBidIncrement)) || Number(minBidIncrement) <= 0) {
      setErrorMessage('Valid minimum bid increment is required.');
      return false;
    }
    if (!minTimeAfterBid || isNaN(Number(minTimeAfterBid)) || Number(minTimeAfterBid) <= 0) {
      setErrorMessage('Valid minimum time after bid is required.');
      return false;
    }
    if (Number(tokenRoyalty) < 0 || Number(tokenRoyalty) > 100) {
      setErrorMessage('Token royalty must be between 0 and 100.');
      return false;
    }
    if (!auctionStartDate) {
      setErrorMessage('Auction start date is required.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const mintArt = async () => {
    if (!validateFields()) {
      return;
    }
  
    setLoading(true);
    setProgress(10);
    setErrorMessage('');

    try {
      if (!sessionData?.authenticated) {
        throw new Error('User not logged in on Lens');
      }

      await validateChainId();
      setProgress(20);
      setProgressMessage('Uploading file...');

      const currency = BONSAI_ADDRESS;
      const fileUrl = await uploadFileFront(file);
      console.log('File uploaded', fileUrl);
      setProgress(40);

      setProgressMessage('Uploading cover, if any...');
      const coverUrl = coverFile ? await uploadFileFront(coverFile) : undefined;
      setProgress(60);
      console.log('Cover uploaded', coverUrl);

      if (!fileUrl) {
        throw new Error('File upload failed');
      }

      setProgressMessage('Creating metadata...');
      const metadata = createMetadata(fileUrl, title, description, file, coverUrl);
      setProgress(70);
      console.log('Metadata created', JSON.stringify(metadata));

      setProgressMessage('Uploading metadata...');
      const arweaveID = await uploadData(metadata);
      console.log('Metadata uploaded', arweaveID);
      setProgress(80);
      const uri = `https://gateway.irys.xyz/${arweaveID}`;
      if (!uri) {
        throw new Error('Failed to upload metadata');
      }

      setProgressMessage('Setting up auction...');
      const initAuctionData: AuctionInitData = {
        availableSinceTimestamp: new Date(auctionStartDate),
        duration: durationMapping[duration],
        minTimeAfterBid: parseInt(minTimeAfterBid, 10),
        reservePrice: BigInt(reservePrice) * BigInt(10 ** 18),
        minBidIncrement: BigInt(minBidIncrement) * BigInt(10 ** 18),
        referralFee: 0,
        currency: currency,
        recipients: [
          {
            recipient: REV_WALLET, 
            split: 200, // 2% for the platform
          },
          {
            recipient: sessionData?.address,
            split: 9800, // 98% for the creator
          },
        ],
        onlyFollowers: false,
        tokenName: title,
        tokenSymbol: "MYST",
        tokenRoyalty: parseInt(tokenRoyalty, 10) * 100,
      };

      setProgressMessage('Encoding auction...');
      const fetchedMetadata = await fetchModuleMetadata(OPEN_ACTION_MODULE_ADDRESS);
      const encodedAuction = await encodeInitData(initAuctionData, fetchedMetadata);

      setProgressMessage('Creating Post on Lens...');
      const result = await execute({
        metadata: uri,
        sponsored: false,
        actions: [
          {
            type: OpenActionType.UNKNOWN_OPEN_ACTION,
            address: OPEN_ACTION_MODULE_ADDRESS, 
            data: encodedAuction,
          }
        ]
      });

      if (result.isFailure()) {
        switch (result.error.name) {
          case 'BroadcastingError':
            console.log('There was an error broadcasting the transaction', result.error.message);
            window.alert('There was an error broadcasting the transaction: ' + result.error.message);
            break;
          case 'PendingSigningRequestError':
            console.log(
              'There is a pending signing request in your wallet. ' +
              'Approve it or discard it and try again.'
            );
            console.log('There is a pending signing request in your wallet. ' + result.error.message);
            window.alert(result.error.message);
            break;
          case 'WalletConnectionError':
            console.log('There was an error connecting to your wallet', result.error.message);
            window.alert('There was an error connecting to your wallet: ' + result.error.message);
            break;
          case 'UserRejectedError':
            // the user decided to not sign, usually this is silently ignored by UIs
            break;
          default:
            console.log('An unknown error occurred', result.error.message);
            window.alert('An unknown error occurred: ' + result.error.message);
        }

        // Log the error to an external service
        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
          fetch('/api/logError', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              error: result.error.message,
              stack: result.error.stack,
            }),
          });
        }
        // eager return
        return;
      }

      if (createPostError) {
        setErrorMessage(createPostError.message);
        throw new Error(createPostError.message || 'There was an error creating the post');
      }

      setProgress(90);
      setProgressMessage('Completing post creation on chain...');
      const completion = await result.value.waitForCompletion();
      const createdPostId = completion.unwrap().id;
      console.log('Post completed', createdPostId);

      if (completion.isFailure()) {
        throw new Error(completion.error.message || 'There was an error processing the transaction');
      }

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const awardUniqueId = `${year}-${month}-${day}-${sessionData?.address}`;

      awardPoints(sessionData?.address, CREATE_NEW_AWARD, 'New Auction', awardUniqueId);
      
      console.log('Post awarded', completion.value);
      setProgress(100);
      setProgressMessage('Post created and awarded successfully. You will be redirected to the gallery shortly.');

      router.push(`/gallery/${createdPostId}`);

    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'There was an error minting the art';
      console.error('Error minting art:', errorMessage);

      // Log the error to an external service
      if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
        fetch('/api/logError', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: errorMessage
          }),
        });
      }

      setProgress(0);

      toast({
        title: "Mint Failed",
        description: String(error),
        variant: "destructive",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className='mt-4'>
        <Label htmlFor="reservePrice">Reserve Price</Label>
        <div className="flex items-center gap-4">
          <Input
            id="reservePrice"
            value={reservePrice}
            onChange={(e) => setReservePrice(e.target.value)}
            placeholder="Enter the minimum price to start your auction"
            type="number"
          />
          BONSAI
        </div>
      </div>
      <div>
        <Label htmlFor="minBidIncrement">Minimum Bid Increment</Label>
        <div className="flex items-center gap-4">
        <Input
          id="minBidIncrement"
          value={minBidIncrement}
          onChange={(e) => setMinBidIncrement(e.target.value)}
          placeholder="Enter the minimum bid increment"
          type="number"
        />
        BONSAI
        </div>
      </div>
      <div>
        <Label htmlFor="duration">Duration</Label>
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">24h</SelectItem>
            <SelectItem value="3 days">3 days</SelectItem>
            <SelectItem value="5 days">5 days</SelectItem>
            <SelectItem value="1 week">1 week</SelectItem>
            <SelectItem value="2 weeks">2 weeks</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="minTimeAfterBid">Minimum Time After Bid (in seconds)</Label>
        <Input
          id="minTimeAfterBid"
          value={minTimeAfterBid}
          onChange={(e) => setMinTimeAfterBid(e.target.value)}
          placeholder="Enter the minimum time after a bid"
          type="number"
        />
      </div>
      <div>
        <Label htmlFor="tokenRoyalty">Secondary Sales Royalty (%)</Label>
        <Input
          id="tokenRoyalty"
          value={tokenRoyalty}
          onChange={(e) => setTokenRoyalty(e.target.value)}
          placeholder="Enter the token royalty"
          type="number"
        />
      </div>
      <div>
        <Label htmlFor="auctionStartDate">Auction Start Date</Label>
        <Input
          id="auctionStartDate"
          value={auctionStartDate}
          onChange={(e) => setAuctionStartDate(e.target.value)}
          placeholder="Enter the auction start date"
          type="datetime-local"
        />
      </div>
      <Progress value={progress} />
      <p className="mt-2 text-center text-gray-500">{progressMessage}</p>
      <div className="mt-8 flex justify-end">
        <Button onClick={mintArt} disabled={loading || !isAuthenticated}>
          {loading ? 'Creating...' : !isAuthenticated ? 'Login to Lens first' : 'Create NFT'}
        </Button>
      </div>
      {errorMessage && (
        <div className="mt-4 text-red-500">
          {errorMessage}
        </div>
      )}
      {createPostError && (
        <div className="mt-4 text-red-500">
          {createPostError.name + " - " + createPostError.message}
        </div>
      )}
    </div>
  );
};

export default MintAuction;
