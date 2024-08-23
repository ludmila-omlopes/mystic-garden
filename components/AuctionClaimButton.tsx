'use client'

import React, { useState } from 'react';
import { useSession } from '@lens-protocol/react-web';
import { useWriteAuctionsOaClaim } from '@/src/generated';
import { Address } from 'viem';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { awardPoints, getCurrentRequiredChainId, validateChainId } from '@/lib/utils';
import { COLLECT_PERCENT_AWARD, BONSAI_ADDRESS } from '@/app/constants';
import { 
    type BaseError,
  } from 'wagmi'
import { polygon, polygonAmoy } from 'viem/chains';
import { switchChain } from '@wagmi/core'

interface AuctionClaimButtonProps {
    collectedPubId: string,
    price: number,
    postCreatorAddress: string,
    winnerAddress: string | undefined;
}

const AuctionClaimButton: React.FC<AuctionClaimButtonProps> = ({ collectedPubId, price, postCreatorAddress, winnerAddress }) => {
    const [loading, setLoading] = useState(false);
    const { data: sessionData } = useSession();
    const { data, writeContractAsync, isPending, error: claimError } = useWriteAuctionsOaClaim();
    const walletAddress = sessionData?.authenticated ? sessionData.address : undefined;
    const requiredChainId = getCurrentRequiredChainId();

    const handleClaim = async () => {
        //TODO: obrigatório estar logado

        try {
            await validateChainId();            

            const collectedPubIdParts = collectedPubId.split('-');
            const profileIdBigInt = BigInt(collectedPubIdParts[0]);
            const collectedPubIdBigInt = BigInt(collectedPubIdParts[1]);

            await writeContractAsync({
                args: [profileIdBigInt, collectedPubIdBigInt],
                chainId: requiredChainId,
            });

            if (claimError) {
                throw claimError;
            };

            if (winnerAddress != postCreatorAddress) {
                awardPoints(winnerAddress, COLLECT_PERCENT_AWARD * price, 'Auction Claim (Buyer)', null);
                awardPoints(postCreatorAddress, COLLECT_PERCENT_AWARD * price, 'Auction Claim (Seller)', null);
            }
            else {
                awardPoints(postCreatorAddress, 0, 'Try selling to someone else =)', null); 
            }
            
            toast.success('Successfully settled!');
            window.location.reload();
        } catch (error: any) {
            console.error(error);
            toast.error(`Settle failed. ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
        <Button className="w-full rounded-md py-3"
            onClick={handleClaim} 
            disabled={isPending}
        >
            {isPending ? 'Loading...' : 'Settle Auction'}

        </Button>
        {claimError && (
        <div>Error: {(claimError as BaseError).shortMessage || claimError.message}</div>
      )}
        </div>
    );
};

export default AuctionClaimButton;
