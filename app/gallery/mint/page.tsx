'use client';

import React, { useState } from 'react';
import { useCreatePost, useCurrencies, OpenActionType, Amount, useSession } from '@lens-protocol/react-web';
import {
  textOnly,
  image,
  video,
  audio,
  article,
  MediaImageMimeType,
  MediaAudioMimeType,
  MediaVideoMimeType,
} from '@lens-protocol/metadata';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadIcon from '@mui/icons-material/Upload';
import { useRouter } from 'next/navigation';
import { REV_WALLET } from '../../constants';

const MintArt = () => {
  const { execute, error, loading: createPostLoading } = useCreatePost();
  const { data: currencies } = useCurrencies();
  const { data: sessionData, error: sessionError, loading: sessionLoading } = useSession();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const maticCurrency = currencies?.find((c) => c.symbol === 'WMATIC');
  const bonsaiCurrency = currencies?.find((c) => c.symbol === 'BONSAI');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      setFileName(selectedFile ? selectedFile.name : '');
    }
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

  const createMetadata = (fileUrl) => {
    const commonMetadata = {
      title: title,
      content: description,
      appId: 'mysticgarden',
      marketplace: {
        name: title,
        description: description,
        external_url: "https://mysticgarden.xyz",
        image: file ? fileUrl : '',
      },
    };

    if (!file) {
      return article({
        ...commonMetadata,
        content: description,
      });
    }

    const extension = file?.name?.split('.')?.pop()?.toLowerCase();

    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return image({
          ...commonMetadata,
          image: {
            item: fileUrl,
            type: file.type as MediaImageMimeType,
          },
        });
      case 'mp4':
      case 'mkv':
      case 'avi':
        return video({
          ...commonMetadata,
          video: {
            item: fileUrl,
            type: file.type as MediaVideoMimeType,
          },
        });
      case 'mp3':
      case 'wav':
      case 'flac':
        return audio({
          ...commonMetadata,
          audio: {
            item: fileUrl,
            type: file.type as MediaAudioMimeType,
          },
        });
      default:
        return article({
          ...commonMetadata,
          content: description,
        });
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

  const triggerFileInput = () => {
    const fileUpload = document.getElementById('file-upload');
    if (fileUpload) {
      fileUpload.click();
    }
  }

  const isAuthenticated = sessionData?.authenticated && !sessionLoading && !sessionError;

  return (
    <main className="w-full max-w-4xl mx-auto py-12 md:py-16 px-4 md:px-6 mt-20"> {/* Added mt-20 to add space on top */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Create New NFT</h1>
            <p className="text-gray-500 dark:text-gray-400">Upload your artwork and set the details.</p>
          </div>
          <div>
            <Label htmlFor="media">Upload Media</Label>
            <div
              className={`border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center space-y-2 transition-colors ${dragActive ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <UploadIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {fileName ? `Selected file: ${fileName}` : 'Drag and drop your image, video, or audio file here.'}
              </p>
              <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
              <Button size="sm" variant="outline" onClick={triggerFileInput}>
                Browse Files
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the title of your NFT" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your NFT" rows={4} />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <div className="flex items-center gap-4">
              <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter the price" type="number" />
              BONSAI
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={mintArt} disabled={loading || !isAuthenticated}>
          {loading ? 'Creating...' : !isAuthenticated ? 'Login to Lens first' : 'Create NFT'}
        </Button>
      </div>
    </main>
  );
};

export default MintArt;
