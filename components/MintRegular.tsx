'use client';

import React, { useState } from 'react';
import { useCreatePost, useCurrencies, OpenActionType, Amount } from '@lens-protocol/react-web';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { REV_WALLET } from '@/app/constants';
import { awardPoints } from '@/lib/utils';
import { CREATE_NEW_AWARD } from '@/app/constants';
import { createMetadata } from '@/lib/utils';
import { profile } from 'console';

const MintRegular = ({ isAuthenticated, sessionData, title, description, file, fileName, coverFile }) => {
  const { execute, error, loading: createPostLoading } = useCreatePost();
  const { data: currencies } = useCurrencies();
  const [price, setPrice] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const bonsaiCurrency = currencies?.find((c) => c.symbol === 'BONSAI');

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
      throw new Error('Error uploading metadata');
    }
  };

  const uploadFile = async (fileToUpload) => {
    if (!fileToUpload) return '';

    const formData = new FormData();
    formData.append('file', fileToUpload);

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
      throw new Error('Error uploading file to IPFS');
    }
  };

  const validateFields = () => {
    if (!title || !description || !file) {
      setErrorMessage('Title, description, and file are required.');
      return false;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setErrorMessage('Valid price is required.');
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
    setErrorMessage('');
    try {
      const currency = bonsaiCurrency;
      const fileUrl = await uploadFile(file);
      const coverUrl = coverFile ? await uploadFile(coverFile) : undefined;

      if (!currency) {
        throw new Error('Invalid currency');
      }

      if (!fileUrl) {
        throw new Error('File upload failed');
      }

      if (!sessionData?.authenticated) {
        throw new Error('User not logged in on Lens');
      }

      console.log("fileUrl", fileUrl);
      console.log("coverUrl", coverUrl);
      const metadata = createMetadata(fileUrl, title, description, file, coverUrl);
      console.log("metadata", metadata); 

      const arweaveID = await uploadData(metadata);
      const uri = `https://gateway.irys.xyz/${arweaveID}`;
      if (!uri) {
        throw new Error('Failed to upload metadata');
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
                recipient: REV_WALLET,
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
        throw new Error(result.error.message || 'There was an error creating the post');
      }

      const completion = await result.value.waitForCompletion();
      const createdPostId = completion.unwrap().id;

      if (completion.isFailure()) {
        throw new Error(completion.error.message || 'There was an error processing the transaction');
      }

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const awardUniqueId = `${year}-${month}-${day}-${sessionData?.address}`;

      awardPoints(sessionData?.address, CREATE_NEW_AWARD, 'New Mint', awardUniqueId);

      console.log('Post created', completion.value);

      // Redirect to the gallery with the created post ID
      router.push(`/gallery/${createdPostId}`);
    } catch (error) {
      console.error('Error minting art:', error);
      setErrorMessage('Error minting art');
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
      {errorMessage && (
        <div className="mt-4 text-red-500">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default MintRegular;
