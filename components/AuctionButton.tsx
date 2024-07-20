import { AnyPublication, OpenActionKind, SessionType, useOpenAction } from '@lens-protocol/react-web';
import { Button } from './ui/button';
import { useSession } from '@lens-protocol/react-web';
import { useReadErc20Allowance, useWriteErc20Approve } from '@/src/generated';
import { Address } from 'viem';
import { awardPoints, getCurrentRequiredChainId, validateChainId } from '@/lib/utils';
import { BID_AWARD, BONSAI_ADDRESS } from '@/app/constants';
import { polygon, polygonAmoy } from 'wagmi/chains';

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

        await refetchAllowance(); 
      } catch (error) {
        console.error("Failed to approve allowance:", error);
        window.alert("Failed to approve allowance. Please check your wallet and try again.");
        return false;
      }
    }
    return true;
  };

  const { execute, loading, error } = useOpenAction({
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

  const run = async () => {
    if (!walletAddress) {
      window.alert("User not authenticated. Please log in to your wallet.");
      return;
    }

    if (!validateBidAmount(props.amount, (props.minimumBid * BigInt(10 ** 18)))) {
      return;
    }

    try {
      validateChainId();

      const allowanceApproved = await checkAndApproveAllowance();
      if (!allowanceApproved) return;

      const result = await execute({
        publication: props.publication,
      });

      if (result.isFailure()) {
        console.error("Error executing bid:", result.error);
        window.alert(`Error: ${result.error.message}. Please try again later.`);
        return;
      }

      const completion = await result.value.waitForCompletion();

      if (completion.isFailure()) {
        console.error("Error completing bid:", completion.error);
        window.alert(`Error: ${completion.error.message}. Please try again later.`);
        return;
      }

      awardPoints(walletAddress, BID_AWARD, "bid", null);
      window.alert("Bid executed successfully");
    } catch (err) {
      console.error("Unexpected error during bid execution:", err);
      window.alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Button className="w-full" onClick={run} disabled={loading || props.disabled}>
      {props.disabled ? "Login to Lens first" : "Place Bid"}
    </Button>
  );
}
