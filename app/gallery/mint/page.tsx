'use client';

import React, { useState } from 'react';
import MintRegular from '@/components/MintRegular';
import MintAuction from '@/components/MintAuction';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadIcon from '@mui/icons-material/Upload';
import { useCreatePost, useCurrencies, OpenActionType, Amount, useSession } from '@lens-protocol/react-web';
import { useAccount } from 'wagmi';


const MintArt = () => {
  const { data: sessionData, error: sessionError, loading: sessionLoading } = useSession();

  const isAuthenticated = sessionData?.authenticated;
  const { address } = useAccount();

  console.log("Autenticated? ", isAuthenticated);
  console.log("Session Data: ", JSON.stringify(sessionData));
  console.log("addrss: ", JSON.stringify(address));

  const [selectedMintType, setSelectedMintType] = useState<'regular' | 'auction'>('regular');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);

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

  const triggerFileInput = () => {
    const fileUpload = document.getElementById('file-upload');
    if (fileUpload) {
      fileUpload.click();
    }
  };

  return (
    <main className="w-full max-w-4xl mx-auto py-12 md:py-16 px-4 md:px-6 mt-20">
      <div>
        <h1 className="text-3xl font-bold">Create New NFT</h1>
        <p className="text-gray-500 dark:text-gray-400">Upload your artwork and set the details.</p>
      </div>

      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="mintType"
            value="regular"
            checked={selectedMintType === 'regular'}
            onChange={() => setSelectedMintType('regular')}
          />
          <span className="ml-2">Regular Mint</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            name="mintType"
            value="auction"
            checked={selectedMintType === 'auction'}
            onChange={() => setSelectedMintType('auction')}
          />
          <span className="ml-2">Auction Mint</span>
        </label>
      </div>

      <div className="space-y-6 mt-4">
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
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the title of your NFT" />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your NFT" rows={4} />
        </div>
      </div>

      {selectedMintType === 'regular' ? (
        <MintRegular
          isAuthenticated={isAuthenticated && address}
          sessionData={sessionData}
          title={title}
          description={description}
          file={file}
          fileName={fileName}
        />
      ) : (
        <MintAuction
          isAuthenticated={isAuthenticated && address}
          sessionData={sessionData}
          title={title}
          description={description}
          file={file}
          fileName={fileName}
        />
      )}
    </main>
  );
};

export default MintArt;
