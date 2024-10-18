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
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { uploadFile, uploadData } from '@/lib/utils';
import { useLensClient } from '@/app/hooks/useLensClient';

const MintRegular = ({ isAuthenticated, sessionData, title, description, file, fileName, coverFile, addLinkInDescription }) => {
  const { execute, error: createPostError, loading: createPostLoading } = useCreatePost();
  const { data: currencies } = useCurrencies();
  const [price, setPrice] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();
  const bonsaiCurrency = currencies?.find((c) => c.symbol === 'BONSAI');
  const client = useLensClient();

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
    setProgress(10);
    setProgressMessage('Starting the minting process...');
    setErrorMessage('');

    try {
      if (!sessionData?.authenticated) {
        throw new Error('User not logged in on Lens');
      }

      setProgress(20);
      const currency = bonsaiCurrency;

      setProgress(30);
      setProgressMessage('Uploading the main file...');
      const fileUrl = await uploadFile(file);

      setProgressMessage('Uploading the cover file (if any)...');
      const coverUrl = coverFile ? await uploadFile(coverFile) : undefined;

      if (!currency) {
        throw new Error('Invalid currency');
      }

      if (!fileUrl) {
        throw new Error('File upload failed');
      }

      if(addLinkInDescription) {
        const nextPubId = await client.publication.predictNextOnChainPublicationId({
          from: sessionData.profile.id,
        });

        description = description + "\n\n" + "⭐ Collect on Mystic Garden paying 0 fees: https://mysticgarden.xyz/gallery/" + nextPubId;
      }

      setProgress(50);
      setProgressMessage('Creating metadata...');
      const metadata = createMetadata(fileUrl, title, description, file, coverUrl);

      setProgressMessage('Uploading metadata to Irys...');
      const arweaveID = await uploadData(metadata);
      const uri = `https://gateway.irys.xyz/${arweaveID}`;

      if (!uri) {
        throw new Error('Failed to upload metadata');
      }

      setProgress(70);
      setProgressMessage('Creating the post on Lens...');
      const result = await execute({
        metadata: uri,
        actions: [
          {
            type: OpenActionType.MULTIRECIPIENT_COLLECT,
            amount: Amount.erc20(currency, parseInt(price, 10)),
            followerOnly: false,
            collectLimit: 1,
            recipients: [
              { recipient: REV_WALLET, split: 2 },
              { recipient: sessionData?.address, split: 98 },
            ],
          }
        ]
      });

      if (result.isFailure()) {
        throw new Error(result.error.message || 'There was an error creating the post');
      }

      setProgress(90);
      setProgressMessage('Completing post creation on chain...');
      const completion = await result.value.waitForCompletion();
      const createdPostId = completion.unwrap().id;

      if (completion.isFailure()) {
        throw new Error(completion.error.message || 'There was an error processing the transaction');
      }

      const currentDate = new Date();
      const awardUniqueId = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}-${sessionData?.address}`;

      awardPoints(sessionData?.address, CREATE_NEW_AWARD, 'New Mint', awardUniqueId);

      setProgress(100);
      setProgressMessage('Post created and awarded successfully. Redirecting to the gallery...');
      router.push(`/gallery/${createdPostId}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'There was an error minting the art. Reload the page and try again.';
      setErrorMessage(errorMessage);
      toast({ title: "Mint Failed", description: errorMessage, variant: "destructive" });
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
      <Progress value={progress} />
      {progress > 0 && <p className="mt-2 text-center text-gray-500">{progressMessage}</p>}
      <div className="mt-8 flex justify-end">
        <Button onClick={mintArt} disabled={loading || !isAuthenticated}>
          {loading ? 'Creating...' : !isAuthenticated ? 'Login to Lens first' : 'Create NFT'}
        </Button>
      </div>
      {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
      {createPostError && <div className="mt-4 text-red-500">{createPostError.name + " - " + createPostError.message}</div>}
    </div>
  );
};

export default MintRegular;
