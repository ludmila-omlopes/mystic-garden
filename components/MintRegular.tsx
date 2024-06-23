'use client';

import React, { useState } from 'react';
import { useCreatePost, useCurrencies, OpenActionType, Amount } from '@lens-protocol/react-web';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { REV_WALLET } from '@/app/constants';

const MintRegular = ({ isAuthenticated, sessionData, title, description, file, fileName }) => {
  const { execute, error, loading: createPostLoading } = useCreatePost();
  const { data: currencies } = useCurrencies();
  const [price, setPrice] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const bonsaiCurrency = currencies?.find((c) => c.symbol === 'BONSAI');

  const createMetadata = (fileUrl) => {
    return {
      title: title,
      description: description,
      image: fileUrl,
      appId: 'mysticgarden',
      marketplace: {
        name: title,
        description: description,
        external_url: "https://mysticgarden.xyz",
      },
    };
  };

  const uploadData = async (metadata) => {
    try {
      const response = await fetch('/api/uploadMetadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metadata }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.receiptId;
    } catch (error) {
      console.error('Error uploading data:', error);
    }

    return "";
  };

  const uploadFile = async () => {
    if (!file) return '';

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/uploadFile', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();
      return data.ipfsUri;
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      return '';
    }
  };

  const mintArt = async () => {
    setLoading(true);
    try {
      const currency = bonsaiCurrency;
      const fileUrl = await uploadFile();

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

      const metadata = createMetadata(fileUrl);

      const arweaveID = await uploadData(metadata);
      const uri = `https://gateway.irys.xyz/${arweaveID}`;
      if (uri === "") {
        setLoading(false);
        return;
      }

      const result = await execute({
        metadata: uri,
        actions: [
          {
            type: OpenActionType.MULTIRECIPIENT_COLLECT,
            amount: Amount.erc20(currency, parseInt(price, 10)),
            followerOnly: false,
            collectLimit: 1,
            recipients: [
              {
                recipient: "REV_WALLET",
                split: 2, // 2% for the platform
              },
              {
                recipient: sessionData?.address,
                split: 98, // 98% for the creator
              },
            ],
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
        <Label htmlFor="price">Price</Label>
        <div className="flex items-center gap-4">
          <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter the price" type="number" />
          BONSAI
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={mintArt} disabled={loading || !isAuthenticated}>
          {loading ? 'Creating...' : !isAuthenticated ? 'Login to Lens first' : 'Create NFT'}
        </Button>
      </div>
    </div>
  );
};

export default MintRegular;
