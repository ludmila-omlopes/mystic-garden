'use client';

import React, { useState } from 'react';
import { useCreatePost, useCurrencies, OpenActionType, useLazyModuleMetadata } from '@lens-protocol/react-web';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { REV_WALLET } from '@/app/constants';
import { uploadFile, uploadData, createMetadata } from '@/lib/utils';
import { encodeInitData } from '@/app/api/lib/lensModuleUtils';
import { AuctionInitData } from '@/lib/parseAuctionData';

const MintAuction = ({ isAuthenticated, sessionData, title, description, file, fileName }) => {
  const { execute, error, loading: createPostLoading } = useCreatePost();
  const { data: currencies } = useCurrencies();
  const [reservePrice, setReservePrice] = useState('');
  const [minBidIncrement, setMinBidIncrement] = useState('');
  const [referralFee, setReferralFee] = useState('0');
  const [duration, setDuration] = useState('');
  const [minTimeAfterBid, setMinTimeAfterBid] = useState('');
  const [tokenRoyalty, setTokenRoyalty] = useState('10');
  const [auctionStartDate, setAuctionStartDate] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const bonsaiCurrency = currencies?.find((c) => c.symbol === 'BONSAI');
  const OPEN_ACTION_MODULE_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? '0x857b5e09d54AD26580297C02e4596537a2d3E329' : '0xd935e230819AE963626B31f292623106A3dc3B19';

  const { execute: executeModuleMetadata } = useLazyModuleMetadata();

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
      const currency = bonsaiCurrency;
      const fileUrl = await uploadFile(file); // Upload media to IPFS
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
        duration: parseInt(duration, 10),
        minTimeAfterBid: parseInt(minTimeAfterBid, 10),
        reservePrice: BigInt(reservePrice) * BigInt(10 ** 18),
        minBidIncrement: BigInt(minBidIncrement) * BigInt(10 ** 18),
        referralFee: parseInt(referralFee, 10)*100,
        currency: bonsaiCurrency.address,
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
        tokenRoyalty: parseInt(tokenRoyalty, 10)*100,
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
      <div>
        <Label htmlFor="reservePrice">Reserve Price</Label>
        <div className="flex items-center gap-4">
          <Input
            id="reservePrice"
            value={reservePrice}
            onChange={(e) => setReservePrice(e.target.value)}
            placeholder="Enter the reserve price"
            type="number"
          />
          BONSAI
        </div>
      </div>
      <div>
        <Label htmlFor="minBidIncrement">Minimum Bid Increment</Label>
        <Input
          id="minBidIncrement"
          value={minBidIncrement}
          onChange={(e) => setMinBidIncrement(e.target.value)}
          placeholder="Enter the minimum bid increment"
          type="number"
        />
      </div>
      <div>
        <Label htmlFor="referralFee">Referral Fee</Label>
        <Input
          id="referralFee"
          value={referralFee || 0}
          onChange={(e) => setReferralFee(e.target.value)}
          placeholder="Enter the referral fee"
          type="number"
        />
      </div>
      <div>
        <Label htmlFor="duration">Duration (in seconds)</Label>
        <Input
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter the auction duration"
          type="number"
        />
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
        <Label htmlFor="tokenRoyalty">Token Royalty</Label>
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
