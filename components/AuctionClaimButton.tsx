'use client'

import React, { useState } from 'react';
import { useSession } from '@lens-protocol/react-web';
import { useWriteAuctionsOaClaim } from '@/src/generated'; // Adjust the path if needed
import { Address } from 'viem';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { awardPoints } from '@/lib/utils';
import { COLLECT_PERCENT_AWARD, BONSAI_ADDRESS } from '@/app/constants';
import { 
    type BaseError,
  } from 'wagmi'

interface AuctionClaimButtonProps {
    collectedPubId: string,
    price: number,
    postCreatorAddress: string;
}

const AuctionClaimButton: React.FC<AuctionClaimButtonProps> = ({ collectedPubId, price, postCreatorAddress }) => {
    const [loading, setLoading] = useState(false);
    const { data: sessionData } = useSession();
    const { data, writeContract, isPending, error: claimError } = useWriteAuctionsOaClaim();
    const walletAddress = sessionData?.authenticated ? sessionData.address : undefined;

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

            if (walletAddress != postCreatorAddress) {
                awardPoints(walletAddress, COLLECT_PERCENT_AWARD * price, 'Auction Claim (Buyer)', null);
                awardPoints(postCreatorAddress, COLLECT_PERCENT_AWARD * price, 'Auction Claim (Seller)', null);
            }
            else {
                awardPoints(walletAddress, 0, 'Try selling to someone else =)', null); 
            }
            
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
