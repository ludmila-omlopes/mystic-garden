import { AnyPublication, OpenActionKind, SessionType, TransactionErrorReason, useOpenAction } from '@lens-protocol/react-web';
import { Button } from './ui/button';
import { useSession } from '@lens-protocol/react-web';
import { useReadErc20Allowance, useWriteErc20Approve } from '@/src/generated';
import { Address } from 'viem';
import { awardPoints, getCurrentRequiredChainId, validateChainId } from '@/lib/utils';
import { BID_AWARD, BONSAI_ADDRESS } from '@/app/constants';
import { ClipLoader } from 'react-spinners';
import { useState } from 'react';

// This button handles the Open Action for placing a bid on an auction

type AuctionButtonProps = {
  address: string;
  data: string;
  publication: AnyPublication;
  disabled: boolean;
  amount: bigint;
  minimumBid: bigint;
}

export function AuctionButton(props: AuctionButtonProps) {
  const { data: sessionData } = useSession();
  const walletAddress = sessionData?.authenticated ? sessionData.address : undefined;
  const chainId = getCurrentRequiredChainId();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: allowance, refetch: refetchAllowance } = useReadErc20Allowance({
    address: BONSAI_ADDRESS,
    chainId: chainId,
    args: [walletAddress as Address, props.address as Address]
  });

  console.log("Minimum bid:", props.minimumBid);
  console.log("Amount:", props.amount);

  const { writeContractAsync } = useWriteErc20Approve();

  const checkAndApproveAllowance = async () => {
    if (!allowance || allowance < props.amount) {
      try {
        const tx = await writeContractAsync({
          address: BONSAI_ADDRESS,
          chainId: chainId,
          args: [props.address as Address, props.amount]
        });
      } catch (error) {
        console.error("Failed to approve allowance:", error);
        window.alert(error + "Failed to approve allowance. Please refresh the page and try again.");
        return false;
      }
    }
    return true;
  };

  const { execute, loading, error: useOAError } = useOpenAction({
    action: {
      kind: OpenActionKind.UNKNOWN,
      address: props.address,
      data: props.data,
    }
  });

  const validateBidAmount = (amount: bigint, minimumBid: bigint): boolean => {
    if (amount < minimumBid) {
      window.alert(`Your bid must be at least ${minimumBid / BigInt(10 ** 18)} BONSAI.`);
      return false;
    }
    return true;
  };

  const runUnsponsored = async () => {
    const selfFunded = await execute({
      publication: props.publication,
      sponsored: false
    });

    if (selfFunded.isFailure()) {
      switch (selfFunded.error.name) {
        case 'InsufficientGasError':
          console.error('Insufficient funds to pay for gas');
          window.alert(`Error executing self funded bid: ${useOAError?.message}.`);
          break;
        case 'InsufficientFundsError':
          console.error('Insufficient funds to pay for bid');
          window.alert(`Error executing self funded bid: ${useOAError?.message}.`);
          break;
        default:         
        console.error('Error executing self funded bid:', selfFunded.error);
        window.alert(`Error executing self funded bid: ${useOAError?.message}.`);
      }
    }

    return selfFunded;
  }

  const run = async () => {
    if (!walletAddress) {
      window.alert("User not authenticated. Please log in to your wallet.");
      return;
    }

    if (!validateBidAmount(props.amount, (props.minimumBid * BigInt(10 ** 18)))) {
      return;
    }

    try {
      setIsSubmitting(true);
      validateChainId();

      const allowanceApproved = await checkAndApproveAllowance();
      if (!allowanceApproved) return;

      var result = await execute({
        publication: props.publication,
      });

      if (result.isFailure()) {
        switch (result.error.name) {
          case 'InsufficientGasError':
            console.error('Insufficient funds to pay for gas');
            window.alert(`Error executing the bid: ${useOAError?.message}.`);
            break;
          case 'InsufficientFundsError':
            console.error('Insufficient funds to pay for bid');
            window.alert(`Error executing the bid: ${useOAError?.message}.`);
            break;
          case 'InsufficientAllowanceError':
            console.error('Insufficient allowance to pay for bid');
            window.alert(`Error executing the bid: ${useOAError?.message}.`);
            break;
          case 'WalletConnectionError':
            console.error('Error connecting to wallet');
            window.alert(`Error executing the bid: ${useOAError?.message}.`);
            break;
          case 'BroadcastingError':
            result = await runUnsponsored();
            break;
          default:  
            console.error('Error executing bid:', result.error);
            window.alert(`Error executing the bid: ${useOAError?.message}.`);
      
        }
        return;
      }

      const completion = await result.value.waitForCompletion();

      if (completion.isFailure()) {
        switch (completion.error.reason) {
          case TransactionErrorReason.INDEXING_TIMEOUT:
            console.error(
              "The tx was broadcasted but it was not indexed within the expected timeout"
            );
            break;
      
          case TransactionErrorReason.MINING_TIMEOUT:
            console.error(
              "The tx was broadcasted but it was not mined within the expected timeout"
            );
            break;
      
          case TransactionErrorReason.REVERTED:
            console.error("The tx was reverted");
            break;
      
          case TransactionErrorReason.UNKNOWN:
            console.error("A not recognized failure");
            break;
        }
        return;
      }
      

      awardPoints(walletAddress, BID_AWARD, "bid", null);
      window.alert("Bid executed successfully");
    } catch (err) {
      console.error("Unexpected error during bid execution:", err);
      window.alert("An unexpected error occurred. Please refresh the page and try again. ");
    }
      finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {isSubmitting && (
        <div className="flex justify-center items-center mb-4">
          <ClipLoader size={20} color={"#000"} loading={isSubmitting} />
          <span className="ml-2">Processing...</span>
        </div>
      )}
      <Button onClick={run} disabled={loading || props.disabled || isSubmitting}>
        {props.disabled ? "Login to Lens first" : "Place Bid"}
      </Button>
    </div>
  );
}