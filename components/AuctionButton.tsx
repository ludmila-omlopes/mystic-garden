import { AnyPublication, OpenActionKind, SessionType, useOpenAction } from '@lens-protocol/react-web';
import { Button } from './ui/button';
import { useSession } from '@lens-protocol/react-web';
import { useReadErc20Allowance, useWriteErc20Approve } from '@/src/generated';
import { Address } from 'viem';
import { awardPoints } from '@/lib/utils';
import { BID_AWARD } from '@/app/constants';

// This button handles the Open Action for placing a bid on an auction

type AuctionButtonProps = {
  address: string;
  data: string;
  publication: AnyPublication;
  disabled: boolean;
  amount: bigint;
}

export function AuctionButton(props: AuctionButtonProps) {
  const { data: sessionData } = useSession();
  const walletAddress = sessionData?.authenticated ? sessionData.address : undefined;

  const { data: allowance, refetch: refetchAllowance } = useReadErc20Allowance({
    address: "0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c",
    chainId: 137,
    args: [walletAddress as Address, props.address as Address]
  });

  const { writeContractAsync } = useWriteErc20Approve();

  const checkAndApproveAllowance = async () => {
    if (!allowance || allowance < props.amount) {
      try {
        const tx = await writeContractAsync({
          address: "0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c",
          chainId: 137,
          args: [props.address as Address, props.amount]
        });

      } catch (error) {
        console.error("Failed to approve allowance:", error);
        window.alert("Failed to approve allowance.");
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

  const run = async () => {
    if (!walletAddress) {
      window.alert("User not authenticated.");
      return;
    }

    const allowanceApproved = await checkAndApproveAllowance();
    if (!allowanceApproved) return;

    const result = await execute({
      publication: props.publication
    });

    if (result.isFailure()) {
      console.error("Error executing bid:", result.error);
      window.alert(`Error: ${result.error.message}`);
      return;
    }

    const completion = await result.value.waitForCompletion();

    if (completion.isFailure()) {
      console.error("Error completing bid:", completion.error);
      window.alert(`Error: ${completion.error.message}`);
      return;
    }
    awardPoints(walletAddress, BID_AWARD, "bid", null);
    window.alert("Bid executed successfully");
  };

  return (
    <Button className="w-full" onClick={run} disabled={loading || props.disabled}>
      {props.disabled ? "Login to Lens first" : "Place Bid"}
    </Button>
  );
}
