'use client'

import React, { useState } from 'react';
import { useWriteAuctionsOaClaim } from '@/src/generated'; // Adjust the path if needed
import { Address } from 'viem';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { 
    type BaseError,
  } from 'wagmi'

interface AuctionClaimButtonProps {
    collectedPubId: string;
}

const AuctionClaimButton: React.FC<AuctionClaimButtonProps> = ({ collectedPubId }) => {
    const [loading, setLoading] = useState(false);

    const { data, writeContract, isPending, error: claimError } = useWriteAuctionsOaClaim();

    const handleClaim = async () => {
        //TODO: obrigatório estar logado

        try {
            setLoading(true);

            const collectedPubIdParts = collectedPubId.split('-');
            const profileIdBigInt = BigInt(collectedPubIdParts[0]);
            const collectedPubIdBigInt = BigInt(collectedPubIdParts[1]);

            console.log('Profile ID:', profileIdBigInt);
            console.log('Collected Pub ID:', collectedPubIdBigInt);

            await writeContract({
                args: [profileIdBigInt, collectedPubIdBigInt],
            });

            toast.success('Successfully claimed!');
        } catch (error: any) {
            console.error(error);
            toast.error(`Claim failed. ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
        <Button 
            onClick={handleClaim} 
            disabled={isPending}
        >
            {isPending ? 'Claiming...' : 'Claim'}

        </Button>
        {claimError && (
        <div>Error: {(claimError as BaseError).shortMessage || claimError.message}</div>
      )}
        </div>
    );
};

export default AuctionClaimButton;
