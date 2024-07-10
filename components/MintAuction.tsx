'use client';

import React, { useState } from 'react';
import { useCreatePost, useCurrencies, OpenActionType, useLazyModuleMetadata, Erc20 } from '@lens-protocol/react-web';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { REV_WALLET } from '@/app/constants';
import { uploadFile, uploadData, createMetadata } from '@/lib/utils';
import { encodeInitData } from '@/app/api/lib/lensModuleUtils';
import { AuctionInitData } from '@/lib/parseAuctionData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MintAuction = ({ isAuthenticated, sessionData, title, description, file, fileName }) => {
  const { execute, error, loading: createPostLoading } = useCreatePost();
  const { data: currencies } = useCurrencies();
  const [reservePrice, setReservePrice] = useState('');
  const [minBidIncrement, setMinBidIncrement] = useState('');
  const [referralFee, setReferralFee] = useState('0');
  const [duration, setDuration] = useState('24h'); // Default value
  const [minTimeAfterBid, setMinTimeAfterBid] = useState('');
  const [tokenRoyalty, setTokenRoyalty] = useState('10');
  const [auctionStartDate, setAuctionStartDate] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const OPEN_ACTION_MODULE_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? '0x857b5e09d54AD26580297C02e4596537a2d3E329' : '0xd935e230819AE963626B31f292623106A3dc3B19';

  const { execute: executeModuleMetadata } = useLazyModuleMetadata();

  const durationMapping = {
    '24h': 24 * 60 * 60,
    '3 days': 3 * 24 * 60 * 60,
    '5 days': 5 * 24 * 60 * 60,
    '1 week': 7 * 24 * 60 * 60
  };

  async function fetchModuleMetadata(moduleAddress: string) {
    const result = await executeModuleMetadata({ implementation: moduleAddress });

    if (result.isFailure()) {
      console.error(result.error.message);
      return null;
    }

    const { metadata } = result.value;
    return metadata;
  }
  
  const mintArt = async () => {
    setLoading(true);
    try {
      const bonsaiCurrency = currencies?.find((c) => c.symbol === 'BONSAI');
      console.log('bonsaiCurrency', bonsaiCurrency);
      const currency = bonsaiCurrency?.address || "0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c";
      console.log('currencies', currencies);
      const fileUrl = await uploadFile(file);
      console.log('fileUrl', fileUrl);

      if (!currency) {
        console.error('Invalid currency');
        setLoading(false);
        return;
      }

      if (!fileUrl) {
        console.error('File upload failed');
        setLoading(false);
        return;
      }

      if (!sessionData?.authenticated) {
        console.error('User not logged in on Lens');
        setLoading(false);
        return;
      }

      const metadata = createMetadata(fileUrl, title, description, file);

      const arweaveID = await uploadData(metadata);
      const uri = `https://gateway.irys.xyz/${arweaveID}`;
      if (uri === "") {
        setLoading(false);
        return;
      }
      console.log('metadata uri', uri);

      const initAuctionData: AuctionInitData = {
        availableSinceTimestamp: new Date(auctionStartDate),
        duration: durationMapping[duration],
        minTimeAfterBid: parseInt(minTimeAfterBid, 10),
        reservePrice: BigInt(reservePrice) * BigInt(10 ** 18),
        minBidIncrement: BigInt(minBidIncrement) * BigInt(10 ** 18),
        referralFee: parseInt(referralFee, 10) * 100,
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

      const fetchedMetadata = await fetchModuleMetadata(OPEN_ACTION_MODULE_ADDRESS);
      const encodedAuction = await encodeInitData(initAuctionData, fetchedMetadata);

      const result = await execute({
        metadata: uri,
        actions: [
          {
            type: OpenActionType.UNKNOWN_OPEN_ACTION,
            address: OPEN_ACTION_MODULE_ADDRESS, 
            data: encodedAuction,
          }
        ]
      });

      if (result.isFailure()) {
        console.error('There was an error creating the post', error?.message);
        setLoading(false);
        return;
      }

      const completion = await result.value.waitForCompletion();
      const createdPostId = completion.unwrap().id;
      console.log('Post created', createdPostId);

      if (completion.isFailure()) {
        console.error('There was an error processing the transaction', completion.error?.message);
        setLoading(false);
        return;
      }

      console.log('Post created', completion.value);

      // Redirect to the gallery with the created post ID
      router.push(`/gallery/${createdPostId}`);
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
        <Label htmlFor="referralFee">Referral Fee (%)</Label>
        <Input
          id="referralFee"
          value={referralFee || 0}
          onChange={(e) => setReferralFee(e.target.value)}
          placeholder="Enter the referral fee"
          type="number"
        />
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
      <div className="mt-8 flex justify-end">
        <Button onClick={mintArt} disabled={loading || !isAuthenticated}>
          {loading ? 'Creating...' : !isAuthenticated ? 'Login to Lens first' : 'Create NFT'}
        </Button>
      </div>
    </div>
  );
};

export default MintAuction;
