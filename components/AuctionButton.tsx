import { AnyPublication, OpenActionKind, useOpenAction } from '@lens-protocol/react-web';
import { Button } from './ui/button';

type AuctionButtonProps = {
  /**
   * The Open Action contract address
   */
  address: string;
  /**
   * The process calldata encoded as a hex string
   */
  data: string;
  /**
   * The Publication to execute the Open Action on
   */
  publication: AnyPublication;
}

export function AuctionButton(props: AuctionButtonProps) {
  const { execute, loading } = useOpenAction({
    action: {
      kind: OpenActionKind.UNKNOWN,
      address: props.address,
      data: props.data,
    }
  });

  const run = async () => {
    // execute the Open Action
    console.log('running auction');
    const result = await execute({
      publication: props.publication,
    });

    // handle relaying errors
    if (result.isFailure()) {
      window.alert(result.error.message);
      return;
    }

    // optional: wait for the transaction to be mined and indexed
    const completion = await result.value.waitForCompletion();

    // handle minining/indexing errors
    if (completion.isFailure()) {
      window.alert(completion.error.message);
      return;
    }

    window.alert("Bid executed");
  };

  return (
    <Button onClick={run} disabled={loading}>
      Bid
    </Button>
  );
}